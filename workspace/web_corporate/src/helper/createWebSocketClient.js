
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {AuthApi} from "../network/api/NETWORKCONSTS";
import {chatStatusEnum} from "./layouts/ChatWidget";

export const createWebSocketClient = (onMessage,driverId,currentUser,setChatStatus) => {

    const socket = new SockJS(AuthApi.BASEURL.replace('api',"GympinChatEndPoint"));
    const client = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000,
        debug: (str) => {
            console.log("str",str)
        },
        connectHeaders: {
            Username: currentUser.FullName,
            UserId: currentUser.Id,
            PhoneNumber:currentUser.PhoneNumber,
            DriverId:driverId,
            AppName:"WEBCORPORATE"
        },
        onChangeState:(state)=>{
            console.log("ChangeState",state);
        },
        onConnect: () => {
            setChatStatus(chatStatusEnum.CONNECT)
            client.subscribe("/chat/SupportChatS/"+driverId, (msg) => {
                if (msg.body) onMessage(JSON.parse(msg.body));
            });
        },
    });


    client.activate();
    return client;
};
