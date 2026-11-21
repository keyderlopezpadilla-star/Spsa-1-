/* Lógica común de las notificaciones push.
   Las suscripciones (los móviles que reciben avisos) se guardan cifradas en el repositorio,
   en data/push-subscriptions.enc.json, porque el repositorio es público.

   Variables de entorno en Vercel:
     VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY  → las claves de las notificaciones
     GITHUB_TOKEN                          → el mismo token de subir.html (Contents: Read and write)
     CRON_SECRET (opcional)                → protege /api/cron; Vercel lo envía solo */
const crypto = require('crypto');
const webpush = require('web-push');

const REPO   = process.env.GITHUB_REPO   || 'keyderlopezpadilla-star/Spsa-1-';
const BRANCH = process.env.GITHUB_BRANCH || 'main';
const FILE   = 'data/push-subscriptions.enc.json';
const SITE   = process.env.SITE_URL      || 'https://spsa-1.vercel.app';

function configured(){
  return !!(process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY && process.env.GITHUB_TOKEN);
}

/* ---------- cifrado AES-256-GCM con una clave derivada de la clave VAPID privada ---------- */
const key = () => crypto.createHash('sha256').update('ks-push|' + process.env.VAPID_PRIVATE_KEY).digest();
function seal(obj){
  const iv = crypto.randomBytes(12), c = crypto.createCipheriv('aes-256-gcm', key(), iv);
  const data = Buffer.concat([c.update(JSON.stringify(obj), 'utf8'), c.final()]);
  return { v:1, iv:iv.toString('base64'), tag:c.getAuthTag().toString('base64'), data:data.toString('base64') };
}
function unseal(box){
  const d = crypto.createDecipheriv('aes-256-gcm', key(), Buffer.from(box.iv, 'base64'));
  d.setAuthTag(Buffer.from(box.tag, 'base64'));
  return JSON.parse(Buffer.concat([d.update(Buffer.from(box.data, 'base64')), d.final()]).toString('utf8'));
}

/* ---------- GitHub ---------- */
async function gh(path, opts = {}){
  const r = await fetch('https://api.github.com/repos/' + REPO + path, {
    ...opts,
    headers:{ Authorization:'Bearer ' + process.env.GITHUB_TOKEN, Accept:'application/vnd.github+json',
      'X-GitHub-Api-Version':'2022-11-28', 'User-Agent':'ks-push', ...(opts.body ? { 'Content-Type':'application/json' } : {}) }
  });
  if(r.status === 404) return null;
  if(!r.ok){ const e = new Error('GitHub ' + r.status); e.status = r.status; throw e; }
  return r.json();
}
async function loadSubs(){
  const f = await gh('/contents/' + FILE + '?ref=' + encodeURIComponent(BRANCH));
  if(!f) return { subs:[], sha:null };
  const box = JSON.parse(Buffer.from(f.content, 'base64').toString('utf8'));
  return { subs:(unseal(box).subs || []), sha:f.sha };
}
async function saveSubs(subs, sha, message){
  const body = { message, branch:BRANCH, content:Buffer.from(JSON.stringify(seal({ subs })) + '\n').toString('base64') };
  if(sha) body.sha = sha;
  return gh('/contents/' + FILE, { method:'PUT', body:JSON.stringify(body) });
}
/* lee, modifica y guarda; si otro guardó entre medias (409/422), vuelve a intentarlo */
async function updateSubs(fn, message){
  for(let i = 0; i < 3; i++){
    const { subs, sha } = await loadSubs();
    const next = fn(subs.slice());
    if(next === null) return subs;                    // nada que guardar
    try{ await saveSubs(next, sha, message); return next; }
    catch(e){ if(e.status !== 409 && e.status !== 422) throw e; }
  }
  throw new Error('No se pudo guardar la suscripción');
}

/* ---------- envío ---------- */
async function sendAll(payload){
  webpush.setVapidDetails(SITE, process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);
  const { subs } = await loadSubs();
  const dead = [];
  let sent = 0;
  await Promise.all(subs.map(async s => {
    try{ await webpush.sendNotification(s.subscription, JSON.stringify(payload), { TTL:60*60*24*3, urgency:'normal' }); sent++; }
    catch(e){ if(e.statusCode === 404 || e.statusCode === 410) dead.push(s.subscription.endpoint); }
  }));
  if(dead.length) await updateSubs(list => list.filter(s => !dead.includes(s.subscription.endpoint)), 'Push: quitar ' + dead.length + ' dispositivo(s) caducado(s)');
  return { total:subs.length, sent, removed:dead.length };
}

/* ---------- utilidades HTTP ---------- */
function json(res, status, obj){
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(obj));
}
function bodyOf(req){
  if(req.body && typeof req.body === 'object') return req.body;
  try{ return JSON.parse(req.body || '{}'); }catch(_){ return {}; }
}
function bearerMatches(req, secret){
  const h = (req.headers && (req.headers.authorization || req.headers.Authorization)) || '';
  const got = Buffer.from(h.replace(/^Bearer\s+/i, '')), want = Buffer.from(String(secret || ''));
  return want.length > 0 && got.length === want.length && crypto.timingSafeEqual(got, want);
}
const clip = (s, n) => String(s || '').slice(0, n);

module.exports = { configured, loadSubs, updateSubs, sendAll, json, bodyOf, bearerMatches, clip, seal, unseal, SITE };
