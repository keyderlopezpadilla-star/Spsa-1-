/* POST   /api/subscribe { subscription, device } → guarda un dispositivo para recibir avisos
   DELETE /api/subscribe { endpoint }             → lo quita */
const { configured, updateSubs, json, bodyOf, clip } = require('./_lib');

const MAX_DEVICES = 20;
const b64url = s => typeof s === 'string' && /^[A-Za-z0-9_-]{8,200}={0,2}$/.test(s);

module.exports = async (req, res) => {
  if(!configured()) return json(res, 503, { error:'not-configured' });
  const b = bodyOf(req);
  try{
    if(req.method === 'POST'){
      const s = b.subscription || {};
      if(typeof s.endpoint !== 'string' || !/^https:\/\//.test(s.endpoint) || s.endpoint.length > 1000 || !s.keys || !b64url(s.keys.p256dh) || !b64url(s.keys.auth))
        return json(res, 400, { error:'bad-subscription' });
      const sub = { endpoint:s.endpoint, keys:{ p256dh:s.keys.p256dh, auth:s.keys.auth } };
      const list = await updateSubs(subs => {
        if(subs.some(x => x.subscription.endpoint === sub.endpoint)) return null;          // ya estaba
        return [...subs, { subscription:sub, device:clip(b.device, 60), added:new Date().toISOString() }].slice(-MAX_DEVICES);
      }, 'Push: nuevo dispositivo');
      return json(res, 200, { ok:true, devices:list.length });
    }
    if(req.method === 'DELETE'){
      const list = await updateSubs(subs => {
        const next = subs.filter(x => x.subscription.endpoint !== b.endpoint);
        return next.length === subs.length ? null : next;
      }, 'Push: quitar dispositivo');
      return json(res, 200, { ok:true, devices:list.length });
    }
    res.setHeader('Allow', 'POST, DELETE');
    return json(res, 405, { error:'method' });
  }catch(e){
    return json(res, 502, { error:'storage', detail:e.message });
  }
};
