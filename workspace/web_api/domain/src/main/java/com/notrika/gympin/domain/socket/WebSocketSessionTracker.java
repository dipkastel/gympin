package com.notrika.gympin.domain.socket;

import com.notrika.gympin.common.socket.chat.dto.WsSessionInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;
import org.springframework.web.socket.messaging.SessionUnsubscribeEvent;

import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class WebSocketSessionTracker {

    private final Map<String, WsSessionInfo> sessions = new ConcurrentHashMap<>();

    @Autowired
    SimpMessagingTemplate messagingTemplate;

    @EventListener
    public void handleSessionConnect(SessionConnectEvent event) {
        StompHeaderAccessor sha = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = sha.getSessionId();
        String userId = sha.getFirstNativeHeader("UserId");
        String username = sha.getFirstNativeHeader("Username");
        String phoneNumber = sha.getFirstNativeHeader("PhoneNumber");
        String appName = sha.getFirstNativeHeader("AppName");
        String driverId = sha.getFirstNativeHeader("DriverId");
        if (username == null && sha.getUser() != null) {
            username = sha.getUser().getName();
        }
        WsSessionInfo info = WsSessionInfo.builder()
                .userId(userId!=null?Long.valueOf(userId):null)
                .username(username)
                .phoneNumber(phoneNumber)
                .sessionId(sessionId)
                .appName(appName)
                .driverId(driverId)
                .connectTime(Instant.now())
                .isOnline(true)
                .build();
        sessions.put(sessionId, info);
        messagingTemplate.convertAndSend("/manage/onlineUsers", sessions);
    }

    @EventListener
    public void handleSubscribe(SessionSubscribeEvent event) {
        StompHeaderAccessor sha = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = sha.getSessionId();
        String dest = sha.getDestination();
        if (sessionId != null && dest != null) {
            WsSessionInfo info = sessions.get(sessionId);
            if (info != null) info.addSubscription(dest);
        }
        messagingTemplate.convertAndSend("/manage/onlineUsers", sessions);
    }

    @EventListener
    public void handleUnsubscribe(SessionUnsubscribeEvent event) {
        StompHeaderAccessor sha = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = sha.getSessionId();
        String subId = sha.getSubscriptionId();
        WsSessionInfo info = sessions.get(sessionId);
        if (info != null && sha.getDestination() != null) {
            info.removeSubscription(sha.getDestination());
        }
        messagingTemplate.convertAndSend("/manage/onlineUsers", sessions);
    }

    @EventListener
    public void handleDisconnect(SessionDisconnectEvent event) {
        StompHeaderAccessor sha = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = sha.getSessionId();
        sessions.remove(sessionId);
        messagingTemplate.convertAndSend("/manage/onlineUsers", sessions);
    }

    public int getActiveSessionCount() {
        return sessions.size();
    }

    public Map<String, WsSessionInfo> getSessions() {
        return sessions;
    }

    public  WsSessionInfo getSession(String sessionId) {
        return sessions.get(sessionId);
    }


}
