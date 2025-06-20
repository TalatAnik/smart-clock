// public/service-worker.js
const CACHE_NAME = "smart-display-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/pwa-icon-192.png",
  "/pwa-icon-512.png",
  // Add other static assets you want cached
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
