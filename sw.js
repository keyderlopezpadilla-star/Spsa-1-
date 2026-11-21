/* Service worker de K & S: hace que el sitio se pueda instalar como app y recibe las notificaciones.
   Las páginas siempre se piden primero a la red (nunca se sirve una versión vieja); la copia en caché
   solo se usa si no hay conexión. Fotos, vídeos y /api no pasan por aquí. */
const CACHE = 'ks-v1';
const SHELL = ['/index.html', '/manifest.webmanifest', '/media/icons/icon-192.png', '/media/icons/badge-96.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if(req.method !== 'GET' || req.mode !== 'navigate') return;          // solo las páginas
  e.respondWith((async () => {
    try{
      const res = await fetch(req);
      if(res.ok){ const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    }catch(_){
      return (await caches.match(req)) || (await caches.match('/index.html')) || Response.error();
    }
  })());
});

/* ---------- notificaciones ---------- */
self.addEventListener('push', e => {
  let d = {};
  try{ d = e.data ? e.data.json() : {}; }catch(_){ d = { body:e.data && e.data.text() }; }
  const title = d.title || 'K & S 💛';
  e.waitUntil(self.registration.showNotification(title, {
    body: d.body || '',
    icon: '/media/icons/icon-192.png',
    badge: '/media/icons/badge-96.png',
    tag: d.tag || undefined,
    renotify: !!d.tag,
    data: { url: d.url || '/' }
  }));
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  const target = new URL((e.notification.data && e.notification.data.url) || '/', self.location.origin).href;
  e.waitUntil((async () => {
    const wins = await self.clients.matchAll({ type:'window', includeUncontrolled:true });
    const same = wins.find(w => w.url === target);
    if(same) return same.focus();
    if(wins[0] && 'navigate' in wins[0]){ await wins[0].navigate(target); return wins[0].focus(); }
    return self.clients.openWindow(target);
  })());
});
