const CACHE_NAME = 'ausgaben-2.1.5590';
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
    caches.keys()
      .then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => self.clients.claim())
      .then(() => {
        // Force all clients to reload with new version
        return self.clients.matchAll({type: 'window'});
      })
      .then(clients => clients.forEach(c => c.navigate(c.url)))
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

// ---- NOTIFICATION SCHEDULING ----
let notifTimer = null;

self.addEventListener('message', event => {
  const data = event.data;
  if (!data) return;

  if (data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (data.type === 'SCHEDULE_NOTIF') {
    // Clear existing
    if (notifTimer) { clearTimeout(notifTimer); notifTimer = null; }
    // Schedule
    notifTimer = setTimeout(() => {
      showDailyNotif();
      // Re-schedule after 24h
      notifTimer = setTimeout(() => showDailyNotif(), 24 * 60 * 60 * 1000);
    }, data.delay);
  }

  if (data.type === 'CANCEL_NOTIF') {
    if (notifTimer) { clearTimeout(notifTimer); notifTimer = null; }
  }

  if (data.type === 'SHOW_NOTIF') {
    self.registration.showNotification(data.title || 'Ausgaben App', {
      body: data.body,
      icon: '/Finanzausgaben-IM/icons/icon-192.png',
      badge: '/Finanzausgaben-IM/icons/icon-192.png',
      vibrate: [200, 100, 200],
      tag: 'daily-reminder',
      renotify: true,
      data: { url: '/Finanzausgaben-IM/' }
    });
  }
});

function showDailyNotif() {
  const msgs = [
    'Hast du heute alle Ausgaben eingetragen? 💶',
    'Nicht vergessen: Heutige Ausgaben eintragen! 🧾',
    'Zeit für deine täglichen Finanzen! 📊',
    'Ausgaben von heute noch nicht eingetragen? ✏️',
  ];
  const msg = msgs[Math.floor(Math.random() * msgs.length)];
  self.registration.showNotification('Ausgaben App', {
    body: msg,
    icon: '/Finanzausgaben-IM/icons/icon-192.png',
    badge: '/Finanzausgaben-IM/icons/icon-192.png',
    vibrate: [200, 100, 200],
    tag: 'daily-reminder',
    renotify: true,
    data: { url: '/Finanzausgaben-IM/' }
  });
}

// Notification click → open app
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      for (const client of list) {
        if (client.url.includes('Finanzausgaben-IM') && 'focus' in client) return client.focus();
      }
      return clients.openWindow('/Finanzausgaben-IM/');
    })
  );
});
