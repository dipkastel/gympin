import { useEffect, useRef, useState, useCallback } from "react";
import { Client, ActivationState } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useSelector } from "react-redux";
import { AuthApi, Chat } from "../network/api/const_api";

export function useWebSocketClient({ ChangeMessages, setInput, statusChanged, driverId }) {
    const clientRef = useRef(null);
    const subRef = useRef(null);
    const [status, setStatus] = useState(ActivationState.INACTIVE);
    const pendingMessages = useRef([]);
    const currentUser = useSelector(state => state.auth.user);

    useEffect(() => {
        statusChanged(status);
    }, [status]);

    const activate = useCallback(() => {
        const socket = new SockJS(AuthApi.BASEURL + Chat.endpoint);

        const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            connectHeaders: {
                Username: currentUser?.FullName,
                UserId: currentUser?.Id,
                PhoneNumber: currentUser?.PhoneNumber,
                DriverId: driverId,
                AppName: "WEBPANEL",
            },
            onConnect: () => {
                setStatus(ActivationState.ACTIVE);
                subRef.current?.unsubscribe();
                subRef.current = client.subscribe(
                    "/chat/SupportChatS/" + driverId,
                    (msg) => {
                        let payload;
                        try {
                            payload = msg?.body ? JSON.parse(msg.body) : null;
                        } catch {
                            payload = msg?.body;
                        }
                        ChangeMessages(payload, msg);
                    }
                );

                while (pendingMessages.current.length > 0) {
                    const msg = pendingMessages.current.shift();
                    client.publish(msg);
                }
            },
            onDisconnect: () => setStatus(ActivationState.INACTIVE),
            onStompError: () => setStatus(ActivationState.INACTIVE),
            onWebSocketClose: () => setStatus(ActivationState.DEACTIVATING),
            onChangeState: (s) => setStatus(s),
        });

        clientRef.current = client;
        client.activate();
    }, [driverId, currentUser]);

    const deactivate = useCallback(() => {
        subRef.current?.unsubscribe();
        subRef.current = null;

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

    const sendMessage = (message) => {
        if (!message?.trim()) return;
        publish({
            destination: "/app/SupportChatM/" + driverId,
            body: { Message: message, Sender: "Server" },
        });
        setInput("");
    };

    useEffect(() => {
        activate();
        return () => deactivate();
    }, [activate, deactivate]);

    return { publish, sendMessage };
}
