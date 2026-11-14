// KaiqueBet - Service Worker para PWA (Network-First para atualizações imediatas)
const CACHE_NAME = 'kaiquebet-v2';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './styles.css?v=2.0',
  './app.js?v=2.0',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Instalação do Service Worker - Força ativação imediata
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch(() => {});
    })
  );
});

// Ativação e limpeza agressiva de todos os caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log('Removendo cache antigo:', name);
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Estratégia Network-First: Sempre busca a versão mais recente na rede quando online
self.addEventListener('fetch', (event) => {
  // Ignora chamadas externas como MQTT, CDNs ou APIs
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          return cachedResponse || caches.match('./index.html');
        });
      })
  );
});
