const cacheName = "TELKOMSEL-MATCH MANIA-1.0.0";
const contentToCache = [
    "Build/build.loader.js",
    "Build/625d520f419299db5c58d508e52c9472.js.unityweb",
    "Build/00d7a81c79a078b6ae1391be5fad7e98.data.unityweb",
    "Build/f82f010d17d4c83ee42060ea2a8871ad.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
