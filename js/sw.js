const CACHE_NAME = 'uma-companhia-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './css/styles.css',
    './js/app.js',
    './js/data.js',
    './js/lib.js',
    './js/services.js',
    './js/ui.js',
    './js/screens.js',
    './js/router.js',
    './manifest.webmanifest',
    './img/icons/icon-192.png',
    './img/icons/icon-512.png'
];
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
    );
    self.skipWaiting();
});
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => {
                if (key !== CACHE_NAME) return caches.delete(key);
            })
        ))
    );
    self.clients.claim();
    
    // Notifica os clientes que há uma nova versão instalada (caso seja atualização)
    self.clients.matchAll().then(clients => {
        clients.forEach(client => client.postMessage({ type: 'VERSION_UPDATE' }));
    });
});
self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
    
    // Estratégia Stale-While-Revalidate para Imagens (Ex: Unsplash)
    if (url.origin !== location.origin && (url.pathname.endsWith('.jpg') || url.pathname.endsWith('.png') || event.request.destination === 'image')) {
        event.respondWith(
            caches.open('uma-companhia-images').then(cache => {
                return cache.match(event.request).then(response => {
                    const fetchPromise = fetch(event.request).then(networkResponse => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    }).catch(() => response); // ignora erro de rede se já tiver em cache
                    return response || fetchPromise;
                });
            })
        );
        return;
    }
    // Estratégia Cache First c/ Network Fallback para o shell
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            if (cachedResponse) return cachedResponse;
            return fetch(event.request).catch(() => {
                // Se falhar e for navegação (HTML), servir index.html com modo offline tratado no router
