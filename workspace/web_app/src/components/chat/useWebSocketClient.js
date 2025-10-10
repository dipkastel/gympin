import {useCallback, useEffect, useRef, useState} from "react";
import {ActivationState, Client} from "@stomp/stompjs";
import SockJS from "sockjs-client";

export function useWebSocketClient({ ChangeMessages, statusChanged, currentUser, onMessageStatus,driverId,subscribeDestination,sendToDestination,endPoint }) {
    const [status, setStatus] = useState(ActivationState.INACTIVE);
    const clientRef = useRef(null);
    const intervalRef = useRef(null);
    const isMountedRef = useRef(true);


    const activate = useCallback(() => {
        if (!isMountedRef.current) return;
        if (clientRef.current && clientRef.current.connected) return;
        const socket = new SockJS(endPoint);

        const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            connectHeaders: {
                Username: currentUser?.FullName,
                UserId: currentUser?.Id,
                PhoneNumber: currentUser?.PhoneNumber,
                DriverId: driverId,
                AppName: "WEBAPP",
            },
            onConnect: () => {
                if (!isMountedRef.current) return;
                setStatus(ActivationState.ACTIVE);
                clearInterval(intervalRef.current);
                intervalRef.current = null;
                const sub = client.subscribe(subscribeDestination, (msg) => {
                    if (msg.body) {
                        try {
                            const parsed = JSON.parse(msg.body);
                            ChangeMessages?.(parsed);
                        } catch (e) {
                            ChangeMessages?.({ Sender: "server", Message: msg.body });
                        }
                    }
                });
                return () => sub?.unsubscribe();
            },
            onChangeState:(state)=>{
                setStatus(state);
            },
            onDisconnect: () => {
                if (!isMountedRef.current) return;
                setStatus(ActivationState.INACTIVE);
            },
            onStompError: (frame) => {
                if (!isMountedRef.current) return;
                setStatus(ActivationState.INACTIVE);
            },
            onWebSocketClose: () => {
                if (!isMountedRef.current) return;
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
            socket.close();
        };

        clientRef.current = client;
        client?.activate();
    }, [currentUser, driverId, ChangeMessages]);

    const deactivate = useCallback(() => {
        if (clientRef.current) {
            clientRef.current?.deactivate();
            clientRef.current = null;
        }
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    const sendMessage = useCallback((msg) => {
        if (clientRef.current && clientRef.current.connected) {
            clientRef.current.publish({
                destination: sendToDestination,
                body: JSON.stringify(msg),
            });
            onMessageStatus?.({ message: msg, status: "sent" });
        } else {
            onMessageStatus?.({ message: msg, status: "failed" });
        }
    }, [driverId, onMessageStatus]);

    const reactive = useCallback(() => {
        if (!isMountedRef.current) return;
        if (status === ActivationState.INACTIVE && !clientRef.current?.connected) {
            activate();
        } else {
        }
    }, [activate, status]);


    useEffect(() => {
        if(statusChanged)
            statusChanged(status);
    }, [status, statusChanged]);

    useEffect(() => {
        isMountedRef.current = true;
        activate();
        return () => {
            isMountedRef.current = false;
            deactivate();
        };
    }, [activate, deactivate]);


    return { sendMessage, reactive };
}
