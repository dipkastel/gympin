

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
                '/users',
                '/finance',
                '/management',
                '/report',
                '/assets/images/noInternet.png'
            ])
        })
    )
})
this.addEventListener("fetch",(event)=>{
    if(!navigator.onLine){
        event.respondWith(
            caches.match(event.request).then((resp)=>{
                if(resp){
                    return resp
                }
            })
        )
    }
})
