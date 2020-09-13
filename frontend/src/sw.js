/* eslint-disable no-undef, no-restricted-globals */
importScripts('/AssetsManager.js');
const { cacheEntries } = new AssetsManager(); // create an instance of AssetsManager

const cacheName = 'v1';
const cacheAssets = [...cacheEntries];

// Catch Install Event
self.addEventListener('install', (event) =>
  event.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => cache.addAll(cacheAssets))
      .then(() => self.skipWaiting())
  )
);

// Catch Activate Event
self.addEventListener('activate', (event) => {
  // Remove unwanted caches
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames.map((cache) => cache !== cacheName && caches.delete(cache))
        )
      )
  );
});

// Catch Fetch Event
self.addEventListener('fetch', (event) =>
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  )
);
