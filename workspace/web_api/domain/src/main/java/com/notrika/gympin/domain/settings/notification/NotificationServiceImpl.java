package com.notrika.gympin.domain.settings.notification;

import com.notrika.gympin.common.settings.notification.dto.NotificationBasePayload;
import com.notrika.gympin.common.settings.notification.dto.NotificationDto;
import com.notrika.gympin.common.settings.notification.enums.NotificationSubscriberStatus;
import com.notrika.gympin.common.settings.notification.param.NotificationParam;
import com.notrika.gympin.common.settings.notification.query.NotificationQuery;
import com.notrika.gympin.common.settings.notification.service.NotificationService;
import com.notrika.gympin.common.util.ApplicationEnum;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.user.UserServiceImpl;
import com.notrika.gympin.persistence.dao.repository.settings.ManageNotificationRepository;
import com.notrika.gympin.persistence.dao.repository.settings.ManageNotificationSubscriptionRepository;
import com.notrika.gympin.persistence.entity.BaseEntity;
import com.notrika.gympin.persistence.entity.management.notification.ManageNotificationEntity;
import com.notrika.gympin.persistence.entity.management.notification.ManageNotificationSubscribesEntity;
import lombok.NonNull;
import nl.martijndwars.webpush.Notification;
import nl.martijndwars.webpush.PushService;
import nl.martijndwars.webpush.Subscription;
import org.codehaus.jackson.map.ObjectMapper;
import org.hibernate.cfg.NotYetImplementedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Future;
import java.util.stream.Collectors;

@Service
public class NotificationServiceImpl extends AbstractBaseService<NotificationParam, NotificationDto, NotificationQuery, ManageNotificationEntity> implements NotificationService {

    @Autowired
    private ManageNotificationRepository notificationRepository;

    @Autowired
    private ManageNotificationSubscriptionRepository notificationSubscriptionRepository;

    @Autowired
    private UserServiceImpl userService;

    @Value("${gympin.notification.public.key}")
    private String publicKey;

    @Value("${gympin.notification.private.key}")
    private String privateKey;

    @Value("${gympin.notification.subject}")
    private String subject;



    @Override
    public NotificationDto add(@NonNull NotificationParam param) {
        return null;
    }


    @Override
    public NotificationDto update(@NonNull NotificationParam param) {
        throw new NotYetImplementedException();
    }

    @Override
    public NotificationDto delete(@NonNull NotificationParam param) {
        throw new NotYetImplementedException();
    }

    @Override
    public NotificationDto getById(long id) {
        //        ManageNotificationEntity notification = notificationRepository.getById(id);
        //        NotificationDto dto=new NotificationDto();
        //        dto.setId(notification.getId());
        //        dto.set
        throw new NotYetImplementedException();
    }

    @Override
    public ManageNotificationEntity add(ManageNotificationEntity entity) {
        throw new NotYetImplementedException();
    }

    @Override
    public ManageNotificationEntity update(ManageNotificationEntity entity) {
        throw new NotYetImplementedException();
    }

    @Override
    public ManageNotificationEntity delete(ManageNotificationEntity entity) {
        throw new NotYetImplementedException();
    }

    @Override
    public ManageNotificationEntity getEntityById(long id) {
        throw new NotYetImplementedException();
    }

    @Override
    public List<ManageNotificationEntity> getAll(Pageable pageable) {
        throw new NotYetImplementedException();
    }

    @Override
    public Page<ManageNotificationEntity> findAll(Specification<ManageNotificationEntity> specification, Pageable pageable) {
        return null;
    }

    @Override
    public List<NotificationDto> convertToDtos(List<ManageNotificationEntity> entities) {
        throw new NotYetImplementedException();
    }

    @Override
    public Page<NotificationDto> convertToDtos(Page<ManageNotificationEntity> entities) {
        return null;
    }

    @Override
    public CompletableFuture<Integer> sendNotificationToAll(NotificationBasePayload data) throws Exception {
        List<ManageNotificationSubscribesEntity> subscriptions = notificationSubscriptionRepository.findAllByDeletedIsFalseAndStatusIs(NotificationSubscriberStatus.ACTIVE);
        data.setAudience(subscriptions.stream().map(BaseEntity::getId).collect(Collectors.toList()));
        return sendNotificationAsync(data);
    }

    @Override
    public CompletableFuture<Integer> sendNotificationToApplication(NotificationBasePayload data) throws Exception {
        List<ManageNotificationSubscribesEntity> subscriptions = notificationSubscriptionRepository.findAllByDeletedIsFalseAndAppNameLikeAndStatusIs(data.getAppName(),NotificationSubscriberStatus.ACTIVE);
        data.setAudience(subscriptions.stream().map(BaseEntity::getId).collect(Collectors.toList()));
        return sendNotificationAsync(data);
    }
//
//    public Integer sendNotification(NotificationBasePayload data) throws Exception {
//        PushService pushService = new PushService();
//        pushService.setPublicKey(publicKey);
//        pushService.setPrivateKey(privateKey);
//        pushService.setSubject(subject);
//        ObjectMapper mapper = new ObjectMapper();
//
//        NotificationBasePayload sendData = NotificationBasePayload.builder().data(data.getData()).build();
//        String payload = mapper.writeValueAsString(sendData);
//
//        List<ManageNotificationSubscribesEntity> audience =notificationSubscriptionRepository.findAllByDeletedIsFalseAndIdIn(data.getAudience());
//        List<ManageNotificationSubscribesEntity> subscriptionsToUpdate = new ArrayList<>();
//        for (ManageNotificationSubscribesEntity sub : audience) {
//            String p256dh = sub.getP256dh();
//            String auth =sub.getAuth();
//            Subscription subscription = new Subscription(sub.getEndpoint(), new Subscription.Keys(p256dh, auth));
//            Notification notification = new Notification(subscription, payload);
//            var res = pushService.sendAsync(notification).get();
//            if(res.getStatusLine().getStatusCode()==410){
//                sub.setStatus(NotificationSubscriberStatus.GONE);
//                subscriptionsToUpdate.add(sub);
//            }
//        }
//        notificationSubscriptionRepository.updateAll(subscriptionsToUpdate);
//        return audience.size()-subscriptionsToUpdate.size();
//    }

    public CompletableFuture<Integer> sendNotificationAsync(NotificationBasePayload data) throws Exception {

        PushService pushService = new PushService();
        pushService.setPublicKey(publicKey);
        pushService.setPrivateKey(privateKey);
        pushService.setSubject(subject);

        ObjectMapper mapper = new ObjectMapper();
        NotificationBasePayload sendData = NotificationBasePayload.builder()
                .data(data.getData())
                .build();

        String payload;
        try {
            payload = mapper.writeValueAsString(sendData);
        } catch (Exception e) {
            return CompletableFuture.failedFuture(e);
        }

        List<ManageNotificationSubscribesEntity> audience =
                notificationSubscriptionRepository.findAllByDeletedIsFalseAndIdIn(data.getAudience());

        List<ManageNotificationSubscribesEntity> toUpdate = Collections.synchronizedList(new ArrayList<>());

        List<CompletableFuture<Void>> futures = audience.stream()
                .map(sub -> CompletableFuture.runAsync(() -> {

                    try {
                        Subscription subscription = new Subscription(
                                sub.getEndpoint(),
                                new Subscription.Keys(sub.getP256dh(), sub.getAuth())
                        );

                        Notification notification = new Notification(subscription, payload);
                        var response = pushService.sendAsync(notification).get();

                        if (response.getStatusLine().getStatusCode() == 410) {
                            sub.setStatus(NotificationSubscriberStatus.GONE);
                            toUpdate.add(sub);
                        }
                    } catch (Exception ignored) {
                    }

                }))
                .toList();

        return CompletableFuture.allOf(futures.toArray(new CompletableFuture[0]))
                .thenApply(v -> {
                    notificationSubscriptionRepository.updateAll(toUpdate);
                    return audience.size() - toUpdate.size();
                });
    }

}
