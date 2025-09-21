const CACHE_NAME = 'chimera-v7-shell-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE)));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request).then(resp => resp || fetch(event.request).catch(() => caches.match('/index.html'))));
});
