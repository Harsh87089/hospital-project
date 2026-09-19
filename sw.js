// CarePulse Hospital - Service Worker (Offline PWA & Asset Cache Engine)
const CACHE_NAME = 'carepulse-v2.3.0';

const PRECACHE_ASSETS = [
  './',
  './index.html',
  './hospital.html',
  './manifest.json',
  './styles.css',
  './css/base.css',
  './css/components.css',
  './css/modals.css',
  './css/themes.css',
  './css/fonts.css',
  './fonts/notosansdevanagari-devanagari-w400.woff2',
  './fonts/notosansdevanagari-devanagari-w600.woff2',
  './fonts/notosansdevanagari-devanagari-w700.woff2',
  './fonts/notosansgurmukhi-gurmukhi-w400.woff2',
  './fonts/notosansgurmukhi-gurmukhi-w600.woff2',
  './fonts/notosansgurmukhi-gurmukhi-w700.woff2',
  './js/main.js',
  './js/config.js',
  './js/utils.js',
  './js/auth.js',
  './js/booking.js',
  './js/queue.js',
  './js/tokens.js',
  './js/pharmacy.js',
  './js/lab.js',
  './js/sos.js',
  './js/calculators.js',
  './js/theme.js',
  './js/i18n.js',
  './js/search.js',
  './js/voice.js',
  './js/tele.js',
  './js/wayfinder.js',
  './js/healthcard.js',
  './js/gateway.js',
  './app.js',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './favicon.svg'
];

// Install: Cache all core application assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(PRECACHE_ASSETS).catch(err => {
        console.warn('[SW] Precache non-blocking warning:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate: Clean up previous cache versions and take immediate control
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Strategy depending on resource type
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);

  // Only handle GET requests and same-origin / supported CDN assets
  if (request.method !== 'GET') return;
  if (!url.protocol.startsWith('http')) return;

  // HTML navigation requests: Network-First with Cache Fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => {
          return caches.match(request).then(cached => {
            return cached || caches.match('./index.html');
          });
        })
    );
    return;
  }

  // Static Assets (CSS, JS, Fonts, Images): Stale-While-Revalidate / Cache-First
  event.respondWith(
    caches.match(request).then(cachedResponse => {
      if (cachedResponse) {
        // Fetch fresh copy in background for next time
        fetch(request).then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then(cache => cache.put(request, networkResponse));
          }
        }).catch(() => { /* Offline, ignore background update */ });
        return cachedResponse;
      }

      // Not in cache: fetch from network and cache
      return fetch(request).then(networkResponse => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        const clone = networkResponse.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
        return networkResponse;
      }).catch(() => {
        // Offline fallback for images
        if (request.destination === 'image') {
          return caches.match('./icons/icon-192.png');
        }
      });
    })
  );
});
