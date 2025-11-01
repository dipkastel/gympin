import store from "./redux/store";
import {NotificationSubscription_add} from "../network/api/NotificationSubscription";

export default function swDev() {

    const swUrl = `${process.env.PUBLIC_URL}/sw.js`;


    function arrayBufferToUrlBase64(buffer) {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary)
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
    }
    function urlBase64ToUint8Array(base64String) {
        const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
        const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    navigator.serviceWorker.register(swUrl).then(async (registration) => {
        const {auth: { token }} = store.getState();
        if(token){
            // const permission = await Notification.requestPermission();
            if (Notification.permission === "granted") {
                navigator.serviceWorker.ready.then(reg => {
                    subscribeAndSendToServer(registration)
                });
            } else {
                console.log("Notification permission denied. 👎");
            }
        }
        async function subscribeAndSendToServer(registration) {
            const vapidPublicKey = "BCesZltGiWtG7RVkAl4qpoMigCmELNahwEyxQ5ivA-IcO93wF3-ERqA2ZqB2-UCYuDVZBiVYgotmaoYOdG9U6bw";
            await UnsubscribingOldSubscription(registration);
            const {auth: {user}} = store.getState();
            console.log("user", user.Id);
            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
            });

            const subscriptionToSend = {
                endpoint: subscription.endpoint,
                p256dh: arrayBufferToUrlBase64(subscription.getKey('p256dh')),
                auth: arrayBufferToUrlBase64(subscription.getKey('auth')),
                user:{Id:user.Id},
                appName:"WEBAPP"
            };

            console.log("Subscription to send:", subscriptionToSend);
            NotificationSubscription_add(subscriptionToSend).then(result => {
                console.log("result", result);
            });
        }
        async function UnsubscribingOldSubscription(registration) {
            const existingSubscription = await registration.pushManager.getSubscription();
            if (existingSubscription) {
                await existingSubscription.unsubscribe();
            }
        }
    }).catch((error) => {
        console.error("Service Worker registration failed 👎 : ", error);
    });
}
