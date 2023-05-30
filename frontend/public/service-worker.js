// Instalar o Service Worker
self.addEventListener('install', function(event) {
  console.log('Service Worker instalado com sucesso');
});

// Ativar o Service Worker
self.addEventListener('activate', function(event) {
  console.log('Service Worker ativado com sucesso');
});

// Interceptando as solicitações de rede
self.addEventListener('fetch', function(event) {
  console.log('Interceptando solicitação:', event.request.url);
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});