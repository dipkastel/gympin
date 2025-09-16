package com.notrika.gympin.domain.socket;

import lombok.*;

import java.time.Instant;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;


@Setter
@Getter
@AllArgsConstructor
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
    private  Set<String> subscriptions = ConcurrentHashMap.newKeySet();


    public void addSubscription(String dest) { subscriptions.add(dest); }
    public void removeSubscription(String dest) { subscriptions.remove(dest); }

}
