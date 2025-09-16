import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {AuthApi} from "../network/api/const_api";

export const createWebSocketClient = (onMessage,destination) => {
    const socket = new SockJS(AuthApi.BASEURL.replace('api',"GympinChatEndPoint"));
    const client = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000,
        debug: (str) => console.log(">>>>>>",str),
        connectHeaders: {
            AppName: "WEBPANEL"
        },
        onConnect: () => {
            client.subscribe(destination,(msg) => {
                if (msg.body) onMessage(JSON.parse(msg.body));
            });
        },
    });

    client.activate();
    return client;
};

