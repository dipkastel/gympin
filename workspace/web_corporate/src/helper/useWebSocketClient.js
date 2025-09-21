import {useCallback, useEffect, useRef, useState} from "react";
import {ActivationState, Client} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {getDriverId} from "./pocket";
import {Api_url, AuthApi} from "../network/api/NETWORKCONSTS";
import {useSelector} from "react-redux";
export function useWebSocketClient({ ChangeMessages, setInput, statusChanged, driverId, currentUser, onMessageStatus }) {
    const [status, setStatus] = useState(ActivationState.INACTIVE);
    const clientRef = useRef(null);
    const intervalRef = useRef(null);
    const isMountedRef = useRef(true);

    useEffect(() => {
        statusChanged(status);
    }, [status, statusChanged]);

    const activate = useCallback(() => {
        if (!isMountedRef.current) return;
        if (clientRef.current && clientRef.current.connected) return;

        console.log(`[WebSocket] Attempting to connect for DriverId: ${driverId}`);
        const socket = new SockJS(AuthApi.BASEURL + Api_url.Chat.endpoint);

        const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            connectHeaders: {
                Username: currentUser?.FullName,
                UserId: currentUser?.Id,
                PhoneNumber: currentUser?.PhoneNumber,
                DriverId: driverId,
                AppName: "WEBCORPORATE",
            },
            onConnect: () => {
                if (!isMountedRef.current) return;
                console.log(`[WebSocket] Connected successfully for DriverId: ${driverId}`);
                setStatus(ActivationState.ACTIVE);
                clearInterval(intervalRef.current);
                intervalRef.current = null;
                const sub = client.subscribe("/chat/SupportChatS/"+ driverId, (msg) => {
                    if (msg.body) {
                        try {
                            const parsed = JSON.parse(msg.body);
                            ChangeMessages?.(parsed);
                        } catch (e) {
                            console.error("[WebSocket] Failed to parse message:", e.message);
                            ChangeMessages?.({ Sender: "server", Message: msg.body });
                        }
                    }
                });
                return () => sub?.unsubscribe();
            },
            onDisconnect: () => {
                if (!isMountedRef.current) return;
                console.log("[WebSocket] Disconnected");
                setStatus(ActivationState.INACTIVE);
            },
            onStompError: (frame) => {
                if (!isMountedRef.current) return;
                console.error("[WebSocket] STOMP error:", frame);
                setStatus(ActivationState.INACTIVE);
            },
            onWebSocketClose: () => {
                if (!isMountedRef.current) return;
                console.log("[WebSocket] WebSocket closed");
                setStatus(ActivationState.INACTIVE);
                if (!intervalRef.current) {
                    intervalRef.current = setInterval(() => {
                        reactive();
                    }, 10000);
                }
            },
        });

        socket.onerror = (error) => {
            if (!isMountedRef.current) return;
            console.error("[WebSocket] SockJS error:", error);
            socket.close();
        };

        clientRef.current = client;
        client.activate();
    }, [currentUser, driverId, ChangeMessages]);

    const deactivate = useCallback(() => {
        if (clientRef.current) {
            clientRef.current.deactivate();
            clientRef.current = null;
        }
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        console.log("[WebSocket] Deactivated");
    }, []);

    const sendMessage = useCallback((msg) => {
        if (clientRef.current && clientRef.current.connected) {
            clientRef.current.publish({
                destination: "/app/SupportChatM/" + driverId,
                body: JSON.stringify(msg),
            });
            console.log("[WebSocket] Message sent:", msg);
            onMessageStatus?.({ message: msg, status: "sent" }); // اطلاع‌رسانی ارسال موفق
        } else {
            console.warn("[WebSocket] Cannot send message, client not connected");
            onMessageStatus?.({ message: msg, status: "failed" }); // اطلاع‌رسانی خطا
        }
    }, [driverId, onMessageStatus]);

    const reactive = useCallback(() => {
        if (!isMountedRef.current) return;
        if (status === ActivationState.INACTIVE && !clientRef.current?.connected) {
            console.log("[WebSocket] Attempting to reconnect...");
            activate();
        } else {
            console.log(`[WebSocket] Reconnect skipped, status: ${ActivationState[status]}`);
        }
    }, [activate, status]);

    useEffect(() => {
        isMountedRef.current = true;
        console.log("[WebSocket] Initial connection attempt");
        activate();
        return () => {
            isMountedRef.current = false;
            deactivate();
        };
    }, [activate, deactivate]);

    return { sendMessage, reactive };
}
