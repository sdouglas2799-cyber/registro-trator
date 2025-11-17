const cacheName = "registro-trator-v1";
const arquivosParaCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icone_192.png",
  "./icone_512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(arquivosParaCache))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.map(k => k !== cacheName ? caches.delete(k) : null))
    )
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(r => r || fetch(event.request))
  );
});
