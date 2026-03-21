const CACHE_NAME = 'student-attendance-v1';
const urlsToCache = [
  './index.html',
  './manifest.json',
  // អ្នកអាចដាក់ឈ្មោះឯកសាររូបភាព ឬកូដផ្សេងៗទៀតនៅទីនេះ
];

// តម្លើង Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// ពេលមានសំណើទាញយកទិន្នន័យ (Fetch)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // បើមានក្នុង Cache យកចេញពី Cache, បើអត់ទេទាញពី Internet
        return response || fetch(event.request);
      })
  );
});