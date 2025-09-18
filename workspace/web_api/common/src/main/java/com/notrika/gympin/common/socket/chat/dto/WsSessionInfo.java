package com.notrika.gympin.common.socket.chat.dto;

import lombok.*;

import java.time.Instant;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;


@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class WsSessionInfo {
    private  String sessionId;
    private  String username;
    private  Long userId;
    private  String phoneNumber;
    private  String appName;
    private  String driverId;
    private  Instant connectTime;
    private  Boolean isOnline;
    private  Set<String> subscriptions = ConcurrentHashMap.newKeySet();


    public void addSubscription(String dest) {
        if(subscriptions==null) subscriptions = ConcurrentHashMap.newKeySet();
        subscriptions.add(dest);
    }
    public void removeSubscription(String dest) { subscriptions.remove(dest); }

}
