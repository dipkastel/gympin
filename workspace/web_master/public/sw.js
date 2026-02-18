let cacheData = "appV1";

//save to cache
this.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(cacheData).then((cache) => {
            cache.addAll([
                '/static/js/bundle.js',
                '/favicon.ico',
                '/manifest.json',
                '/index.html',
                '/',
                '/personnel',
                '/finance',
                '/management',
                '/report',
                '/assets/images/noInternet.png'
            ])
        })
    )
})
this.addEventListener("fetch", (event) => {
    if (!navigator.onLine) {
        event.respondWith(
            caches.match(event.request).then((resp) => {
                if (resp) {
                    return resp
                }
            })
        )
    }
});
this.addEventListener("push", (event) => {
    const notif = event.data.json().data;
    this.registration.showNotification(notif.title, {
        body: notif.body,
        icon: notif.icon,
        data: notif.data,
        tag: notif.tag,
        badge: notif.badge,
        lang: notif.lang,
        dir: notif.dir,
        image:notif.image,
        timestamp: notif.timestamp,
        requireInteraction: notif.requireInteraction,
        renotify: notif.renotify,
        silent: notif.silent,
        actions: getActions(),
    });
    function getActions(){
        if(notif?.actions?.length<1)return null;
        var result = [];
        for (var act in notif.actions){
            result.push({
                action: notif.actions[act].action,
                title: notif.actions[act].title,
                icon: notif.actions[act].icon,
                placeholder: notif.actions[act].placeholder,
                type: notif.actions[act].type
            })
        }
        return result;
    }
});

this.addEventListener("notificationclick", (event) => {
    event?.notification?.close();
    if (event?.notification?.data)
        event.waitUntil(clients.openWindow(event?.notification?.data));
    else
        event.waitUntil(clients.openWindow("/"));
});

