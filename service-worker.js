const CACHE_NAME = "g-glam-v1";

const FILES_TO_CACHE = [
  "/G-Glam/",
  "/G-Glam/index.html",
  "/G-Glam/cart.html",
  "/G-Glam/manifest.json"
];


// تثبيت التطبيق وحفظ الملفات الأساسية
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(FILES_TO_CACHE);
      })
  );

  self.skipWaiting();
});


// تشغيل التطبيق من الذاكرة عند توفر الملفات
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});


// تحديث الملفات القديمة
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );

  self.clients.claim();
});
