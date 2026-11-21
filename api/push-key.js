/* GET /api/push-key → la clave pública VAPID, para que el navegador pueda suscribirse */
const { configured, json } = require('./_lib');

module.exports = (req, res) => {
  if(!configured()) return json(res, 503, { error:'not-configured' });
  json(res, 200, { publicKey:process.env.VAPID_PUBLIC_KEY });
};
