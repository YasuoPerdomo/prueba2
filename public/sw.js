// Service Worker for Terminal Pesquero - High Performance Mobile Cache
const CACHE_NAME_STATIC = "tp-static-v1";
const CACHE_NAME_IMAGES = "tp-images-v1";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME_STATIC && key !== CACHE_NAME_IMAGES) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Only handle GET requests
  if (request.method !== "GET") return;

  // 1. IMAGE CACHING (Cache-First): Local WebP assets, Unsplash, external dish photos
  const isImage =
    request.destination === "image" ||
    url.pathname.match(/\.(webp|jpg|jpeg|png|svg|gif|avif)$/i) ||
    url.hostname.includes("images.unsplash.com") ||
    url.hostname.includes("ytimg.com") ||
    url.hostname.includes("googleusercontent.com");

  if (isImage) {
    event.respondWith(
      caches.open(CACHE_NAME_IMAGES).then(async (cache) => {
        const cachedResponse = await cache.match(request);
        if (cachedResponse) {
          return cachedResponse;
        }

        try {
          const networkResponse = await fetch(request);
          if (networkResponse && (networkResponse.status === 200 || networkResponse.type === "opaque")) {
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        } catch (error) {
          return cachedResponse || new Response("", { status: 408 });
        }
      })
    );
    return;
  }

  // 2. FONTS (Cache-First)
  if (url.hostname.includes("fonts.googleapis.com") || url.hostname.includes("fonts.gstatic.com")) {
    event.respondWith(
      caches.open(CACHE_NAME_STATIC).then(async (cache) => {
        const cached = await cache.match(request);
        if (cached) return cached;
        const res = await fetch(request);
        cache.put(request, res.clone());
        return res;
      })
    );
    return;
  }

  // 3. STATIC SCRIPTS & STYLES (Stale-While-Revalidate)
  if (request.destination === "script" || request.destination === "style") {
    event.respondWith(
      caches.open(CACHE_NAME_STATIC).then(async (cache) => {
        const cachedResponse = await cache.match(request);
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          })
          .catch(() => cachedResponse);

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }
});
