/* GET /api/cron → lo llama Vercel una vez al día (vercel.json).
   Si hoy es día 21 en Madrid, felicita el aniversario a todos los dispositivos. */
const { configured, sendAll, json, bearerMatches } = require('./_lib');

const START = { y:2026, m:6 };          // 21 de junio de 2026

function madridToday(now = new Date()){
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-GB', { timeZone:'Europe/Madrid', year:'numeric', month:'numeric', day:'numeric' })
    .formatToParts(now).map(x => [x.type, x.value]));
  return { y:+p.year, m:+p.month, d:+p.day };
}

module.exports = async (req, res) => {
  /* Vercel firma sus llamadas con CRON_SECRET si existe; si no, se identifica con su user-agent */
  const ua = (req.headers && req.headers['user-agent']) || '';
  const allowed = process.env.CRON_SECRET ? bearerMatches(req, process.env.CRON_SECRET) : /vercel-cron/i.test(ua);
  if(!allowed) return json(res, 401, { error:'unauthorized' });
  if(!configured()) return json(res, 503, { error:'not-configured' });

  const t = madridToday(req.query && req.query.now ? new Date(req.query.now) : new Date());
  if(t.d !== 21) return json(res, 200, { ok:true, skipped:'not-the-21st', today:t });
  const months = (t.y*12 + t.m) - (START.y*12 + START.m);
  if(months < 1) return json(res, 200, { ok:true, skipped:'too-early' });
  const years = Math.floor(months / 12), rest = months % 12;
  const label = years ? years + (years === 1 ? ' year' : ' years') + (rest ? ' and ' + rest + (rest === 1 ? ' month' : ' months') : '')
                      : months + (months === 1 ? ' month' : ' months');
  try{
    const r = await sendAll({
      title:'Happy ' + label + ' 💛',
      body:label.charAt(0).toUpperCase() + label.slice(1) + ' of us today. Something new might be waiting for you…',
      url:'/', tag:'anniversary-' + t.y + '-' + t.m
    });
    return json(res, 200, { ok:true, months, ...r });
  }catch(e){
    return json(res, 502, { error:'send', detail:e.message });
  }
};
module.exports.madridToday = madridToday;
