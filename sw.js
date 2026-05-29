const CACHE_NAME = 'ausgaben-v3';
const BASE = '/Finanzausgaben-IM';
const ASSETS = [
  BASE + '/',
  BASE + '/index.html',
  BASE + '/manifest.json',
  BASE + '/icons/icon-192.png',
  BASE + '/icons/icon-512.png',
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS).catch(() => {}))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Network first, fall back to cache
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).then(response => {
      const clone = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
      return response;
    }).catch(() => caches.match(event.request))
  );
});
