/* POST /api/notify { title, body, url } → envía una notificación a todos los dispositivos.
   Solo para Keyder: necesita «Authorization: Bearer <GITHUB_TOKEN>», el mismo token de subir.html.
   GET con el mismo token → cuántos dispositivos hay. */
const { configured, sendAll, loadSubs, json, bodyOf, bearerMatches, clip } = require('./_lib');

module.exports = async (req, res) => {
  if(!configured()) return json(res, 503, { error:'not-configured' });
  if(!bearerMatches(req, process.env.GITHUB_TOKEN)) return json(res, 401, { error:'unauthorized' });
  try{
    if(req.method === 'GET'){
      const { subs } = await loadSubs();
      return json(res, 200, { devices:subs.length });
    }
    if(req.method !== 'POST'){ res.setHeader('Allow', 'GET, POST'); return json(res, 405, { error:'method' }); }
    const b = bodyOf(req);
    const title = clip(b.title, 80).trim(), body = clip(b.body, 240).trim();
    if(!title) return json(res, 400, { error:'title' });
    const url = typeof b.url === 'string' && /^\/[\w\-./?=&#%]*$/.test(b.url) ? b.url : '/';
    const r = await sendAll({ title, body, url, tag:clip(b.tag, 40) || undefined });
    return json(res, 200, { ok:true, ...r });
  }catch(e){
    return json(res, 502, { error:'send', detail:e.message });
  }
};
