const CACHE_NAME = 'fuzzy-cache-v2';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './css/vendors/iconsax.css',
  './css/vendors/bootstrap.min.css',
  './css/vendors/swiper-bundle.min.css',
  './css/style.css',
  './js/swiper-bundle.min.js',
  './js/custom-swiper.js',
  './js/iconsax.js',
  './js/bootstrap.bundle.min.js',
  './js/script.js',
  './images/logo/favicon.png',
  './images/background/auth_bg.jpg',
  './images/background/header-bg.png',
  './images/banner/banner-1.jpg'
];

// Install Event - Pre-cache critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Pre-caching static assets');
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event - Clean up old caches immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - Network-First for HTML/JS/CSS to prevent cache traps, Cache-First for static media
self.addEventListener('fetch', (event) => {
  // Only handle GET requests and skip API requests
  if (event.request.method !== 'GET' || event.request.url.includes('/api/')) {
    return;
  }

  const requestUrl = event.request.url;
  const isHtmlJsCss = event.request.mode === 'navigate' ||
                      requestUrl.endsWith('.html') ||
                      requestUrl.includes('/assets/') ||
                      requestUrl.endsWith('.js') ||
                      requestUrl.endsWith('.css');

  if (isHtmlJsCss) {
    // Network-First strategy to ensure latest React code is always loaded on normal F5
    event.respondWith(
      fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Fallback to cache if network is offline
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
      })
    );
  } else {
    // Cache-First strategy for images, icons, and static fonts
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        }).catch((err) => {
          console.warn('[Service Worker] Fetch failed for:', event.request.url, err);
          return new Response('Network error', { status: 480, statusText: 'Network Error' });
        });
      })
    );
  }
});
