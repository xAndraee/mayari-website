/*
  Mayari SMP - Service Worker
  Provides offline support and intelligent caching
*/

const CACHE_NAME = 'mayari-smp-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/rules.html',
  '/admin-team.html',
  '/css/global.css',
  '/css/pages/home.css',
  '/css/pages/rules.css',
  '/css/pages/admin-team.css',
  '/js/script.js',
  '/images/logo.png',
  '/images/about-section-person-image.png',
  '/images/survival-minigames-image.jpg',
  '/images/staff/aerisz.png',
  '/images/staff/arcain7.png',
  '/images/staff/atomic.png',
  '/images/staff/crisrion1.png',
  '/images/staff/jei.png',
  '/images/staff/kassian.png',
  '/images/staff/mizzu.png',
  '/images/staff/ryuu.png',
  '/images/staff/ssduction.png'
];

// Install event: cache essential files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Service Worker: caching app shell');
      return cache.addAll(URLS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate event: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event: serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip external API calls (Discord, Minecraft)
  if (url.hostname.includes('discord.com') || 
      url.hostname.includes('mcsrvstat.us') ||
      url.hostname.includes('minetools.eu') ||
      url.hostname.includes('visage.surgeplay.com')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Cache API responses
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, clone);
          });
          return response;
        })
        .catch(() => {
          // Return cached response if offline
          return caches.match(request);
        })
    );
    return;
  }

  // For HTML/CSS/JS: try network first, fallback to cache
  if (request.headers.get('accept')?.includes('text/html') ||
      url.pathname.endsWith('.css') ||
      url.pathname.endsWith('.js')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, clone);
          });
          return response;
        })
        .catch(() => caches.match(request) || new Response('Offline'))
    );
    return;
  }

  // For images: cache first, fallback to network
  if (request.headers.get('accept')?.includes('image')) {
    event.respondWith(
      caches.match(request).then(cachedResponse => {
        return cachedResponse || fetch(request).then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, clone);
          });
          return response;
        });
      })
    );
    return;
  }

  // Default: cache first, fallback to network
  event.respondWith(
    caches.match(request).then(cachedResponse => {
      return cachedResponse || fetch(request);
    })
  );
});