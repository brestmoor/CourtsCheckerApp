export function askPermission() {
    return new Promise(function(resolve, reject) {
        const permissionResult = Notification.requestPermission(function(result) {
            if (result !== 'granted') {
                reject(result)
            } else {
                resolve(result)
            }
        });

        if (permissionResult) {
            permissionResult.then(resolve, reject);
        }
    });
}

export function subscribeUserToPush() {
    return navigator.serviceWorker.register('/service2-worker.js')
        .then(function(registration) {
            const subscribeOptions = {
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(
                    'BI8Y24asVcd06UeNYsQAoyUe20kvpxFEFt3VkOYSA7GwpTSR1LrHUi4RuwTJQEwIszq7CFi7Dqza7NemQM8Gz4c'
                )
            };
            return registration.pushManager.subscribe(subscribeOptions);
        })
        .then(function(pushSubscription) {
            console.log('Received PushSubscription: ', JSON.stringify(pushSubscription));
            return pushSubscription;
        });
}


export function isSupported() {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        return false;
    }
    return true
}


function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}