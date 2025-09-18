import { useEffect, useRef, useState, useCallback } from "react";
import { Client, ActivationState } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {getDriverId} from "./pocket";
import {Api_url, AuthApi} from "../network/api/NETWORKCONSTS";
import {useSelector} from "react-redux";

export function useWebSocketClient({ ChangeMessages,setInput,statusChanged,driverId }) {
    const clientRef = useRef(null);
    const [status, setStatus] = useState(ActivationState.INACTIVE);
    const pendingMessages = useRef([]);
    const currentUser = useSelector(state => state.auth.user)
    const socket = new SockJS(AuthApi.BASEURL+Api_url.Chat.endpoint);
    let client;

    useEffect(() => {
        statusChanged(status);
    }, [status]);

    const activate = useCallback(() => {
        client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay:5000,
            connectHeaders: {
                Username: currentUser?.FullName,
                UserId: currentUser?.Id,
                PhoneNumber: currentUser?.PhoneNumber,
                DriverId: getDriverId(currentUser?.id),
                AppName: "WEBCORPORATE",
            },
            onConnect: () => {
                setStatus(ActivationState.ACTIVE);
                const sub = subscribe("/chat/SupportChatS/" + driverId, (msg) => {
                    ChangeMessages(msg);
                });
                while (pendingMessages.current.length > 0) {
                    const msg = pendingMessages.current.shift();
                    client.publish(msg);
                }
                return () => sub?.unsubscribe();
            },
            onDisconnect: () => setStatus(ActivationState.INACTIVE),
            onStompError: () => setStatus(ActivationState.INACTIVE),
            onWebSocketClose: () => setStatus(ActivationState.DEACTIVATING),
            onChangeState: (s) => setStatus(s),
        });

        clientRef.current = client;
        if (client)
            client.activate();
    }, []);

    const deactivate = useCallback(() => {
        clientRef.current?.deactivate();
        clientRef.current = null;
    }, []);

    const publish = useCallback((msg) => {
        const frame = {
            destination: msg.destination,
            body: typeof msg.body === "string" ? msg.body : JSON.stringify(msg.body)
        };
        if (clientRef.current && clientRef.current.connected) {
            clientRef.current.publish(frame);
        } else {
            pendingMessages.current.push(frame);
            if (!clientRef.current || clientRef.current.state === ActivationState.INACTIVE) {
                activate();
            }
        }
    }, [activate]);

    const subscribe = useCallback((dest, callback, headers = {}) => {
        if (!clientRef?.current) return null;
        return clientRef?.current?.subscribe(dest, (msg) => {
            let payload = null;
            try {
                payload = msg?.body ? JSON.parse(msg?.body) : null;
            } catch {
                payload = msg?.body;
            }
            callback(payload, msg);
            // ChangeMessages && ChangeMessages(payload);
        }, headers);
    }, [ChangeMessages]);

    const sendMessage = (message) => {
        if (!message.trim()) return;
        publish({
            destination: "/app/SupportChatM/" + driverId,
            body: { Message: message, Sender: "Client" },
        });
        setInput("");
    }

    useEffect(() => {
        activate();
        return () => deactivate();
    }, [activate,deactivate]);

    return { publish,sendMessage };
}
