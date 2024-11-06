const CACHE_NAME = 'v1';
const URLS_TO_CACHE = [
    "/index.html",
    "/css/style.css",
    "/img/profile.jpg",
    "/js/main.js",
    "/img/favicon.ico",      // Jika favicon diperlukan
    "/lib/slick/slick.css", // Jika Anda ingin meng-cache slick.css
    "/lib/slick/slick-theme.css", // Jika Anda ingin meng-cache slick-theme.css
    "/lib/lightbox/css/lightbox.min.css", // Jika Anda ingin meng-cache lightbox.min.css
    "/lib/easing/easing.min.js", // Jika Anda ingin meng-cache easing.min.js
    "/lib/slick/slick.min.js", // Jika Anda ingin meng-cache slick.min.js
    "/lib/typed/typed.min.js", // Jika Anda ingin meng-cache typed.min.js
    "/lib/waypoints/waypoints.min.js", // Jika Anda ingin meng-cache waypoints.min.js
    "/lib/isotope/isotope.pkgd.min.js", // Jika Anda ingin meng-cache isotope.pkgd.min.js
    "/lib/lightbox/js/lightbox.min.js", // Jika Anda ingin meng-cache lightbox.min.js
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Caching files');
                return cache.addAll(URLS_TO_CACHE);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
