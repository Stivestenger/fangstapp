self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Stive Stenger Fiskeklubb';
  const options = {
    body: data.body || '🎣 Noen har fanget noe!',
    icon: '/flylog.html',
    badge: '/flylog.html',
    vibrate: [200, 100, 200],
    data: { url: self.location.origin + '/flylog.html' }
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());
