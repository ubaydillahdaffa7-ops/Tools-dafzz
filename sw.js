'use strict';

const CACHE_NAME = 'dafzz-tools-v6';
const CORE_FILES = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './tools.json',
  './manifest.webmanifest'
];

// QR libraries are cached separately: a CDN outage must not prevent the app
// itself from installing or opening. They are fetched during first install
// when the device has an internet connection.
const QR_LIBRARIES = [
  'https://cdn.jsdelivr.net/npm/qrcode@1.5.4/build/qrcode.min.js',
  'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js'
];
const QR_CACHE = 'dafzz-qr-libraries-v1';
const TRUSTED_CDN_HOSTS = new Set(['cdn.jsdelivr.net', 'unpkg.com']);

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const core = await caches.open(CACHE_NAME);
    await core.addAll(CORE_FILES);
    const qrCache = await caches.open(QR_CACHE);
    await Promise.all(QR_LIBRARIES.map(async url => {
      try {
        const request = new Request(url, { mode: 'cors', cache: 'reload' });
        const response = await fetch(request);
        if (response.ok && (response.type === 'cors' || response.type === 'basic')) {
          await qrCache.put(request, response.clone());
        }
      } catch (error) {
        // Keep installation successful even if a CDN is temporarily offline.
      }
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys
      .filter(key => key.startsWith('dafzz-tools-') && key !== CACHE_NAME)
      .map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);

  // Cache QR scripts from the approved CDNs so they remain available offline
  // after they have been downloaded once.
  if (TRUSTED_CDN_HOSTS.has(url.hostname) && /\/(?:qrcode|jsqr)(?:@|\.|\/|$)/i.test(url.pathname)) {
    event.respondWith((async () => {
      const cache = await caches.open(QR_CACHE);
      const cached = await cache.match(request, { ignoreSearch: false });
      if (cached) return cached;
      try {
        const response = await fetch(request);
        if (response.ok) await cache.put(request, response.clone());
        return response;
      } catch (error) {
        return new Response('QR library belum pernah tersimpan. Sambungkan internet sekali lalu muat ulang.', {
          status: 503,
          headers: { 'Content-Type': 'text/plain; charset=utf-8' }
        });
      }
    })());
    return;
  }

  if (url.origin !== self.location.origin) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    try {
      const response = await fetch(request);
      if (response.ok) await cache.put(request, response.clone());
      return response;
    } catch (error) {
      const cached = await cache.match(request);
      if (cached) return cached;
      if (request.mode === 'navigate') {
        return (await cache.match('./index.html')) || Response.error();
      }
      return Response.error();
    }
  })());
});
