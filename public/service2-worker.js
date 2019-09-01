self.addEventListener('push', function(event) { /* eslint-disable-line no-restricted-globals */
    if (event.data) {
        const promiseChain = self.registration.showNotification(event.data.text());
        event.waitUntil(promiseChain);
    } else {
        console.log('This push event has no data.');
    }
});


self.addEventListener('install', function(event) { /* eslint-disable-line no-restricted-globals */
    console.log("Service worker installed!")
});