package com.notrika.gympin.domain.settings.notification;

import com.notrika.gympin.common.settings.notification.dto.NotificationBasePayload;
import com.notrika.gympin.common.settings.notification.dto.NotificationDto;
import com.notrika.gympin.common.settings.notification.dto.NotificationSubscriptionDto;
import com.notrika.gympin.common.settings.notification.enums.NotificationSubscriberStatus;
import com.notrika.gympin.common.settings.notification.param.NotificationParam;
import com.notrika.gympin.common.settings.notification.param.NotificationSubscriptionParam;
import com.notrika.gympin.common.settings.notification.query.NotificationSubscriptionQuery;
import com.notrika.gympin.common.settings.notification.service.NotificationService;
import com.notrika.gympin.common.settings.notification.service.NotificationSubscriptionService;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.user.UserServiceImpl;
import com.notrika.gympin.domain.util.convertor.NoteConvertor;
import com.notrika.gympin.domain.util.convertor.NotificationConvertor;
import com.notrika.gympin.persistence.dao.repository.settings.ManageNotificationRepository;
import com.notrika.gympin.persistence.dao.repository.settings.ManageNotificationSubscriptionRepository;
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
import org.springframework.stereotype.Service;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.interfaces.ECPublicKey;
import java.security.spec.ECGenParameterSpec;
import java.security.spec.ECParameterSpec;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificationSubscriptionServiceImpl extends AbstractBaseService<NotificationSubscriptionParam, NotificationSubscriptionDto, NotificationSubscriptionQuery, ManageNotificationSubscribesEntity> implements NotificationSubscriptionService {

    @Autowired
    private ManageNotificationSubscriptionRepository notificationSubscriptionRepository;

    @Autowired
    private UserServiceImpl userService;


    @Override
    public NotificationSubscriptionDto add(@NonNull NotificationSubscriptionParam param) {
        ManageNotificationSubscribesEntity entity = ManageNotificationSubscribesEntity.builder()
                .appName(param.getAppName())
                .user(userService.getEntityById(param.getUser().getId()))
                .auth(param.getAuth())
                .endpoint(param.getEndpoint())
                .p256dh(param.getP256dh())
                .status(NotificationSubscriberStatus.ACTIVE)
                .build();
        return NotificationConvertor.toDto(add(entity));
    }


    @Override
    public NotificationSubscriptionDto update(@NonNull NotificationSubscriptionParam param) {
        ManageNotificationSubscribesEntity entity = getEntityById(param.getId());
        entity.setStatus(param.getStatus());
        throw new NotYetImplementedException();
    }

    @Override
    public NotificationSubscriptionDto delete(@NonNull NotificationSubscriptionParam param) {
        ManageNotificationSubscribesEntity entity = delete(getEntityById(param.getId()));
        return NotificationConvertor.toDto(entity);
    }

    @Override
    public NotificationSubscriptionDto getById(long id) {
       return NotificationConvertor.toDto(notificationSubscriptionRepository.getById(id));
    }

    @Override
    public ManageNotificationSubscribesEntity add(ManageNotificationSubscribesEntity entity) {
        return notificationSubscriptionRepository.add(entity);
    }

    @Override
    public ManageNotificationSubscribesEntity update(ManageNotificationSubscribesEntity entity) {
        return notificationSubscriptionRepository.update(entity);
    }

    @Override
    public ManageNotificationSubscribesEntity delete(ManageNotificationSubscribesEntity entity) {
        return notificationSubscriptionRepository.deleteById2(entity);
    }

    @Override
    public ManageNotificationSubscribesEntity getEntityById(long id) {
        return notificationSubscriptionRepository.getById(id);
    }

    @Override
    public List<ManageNotificationSubscribesEntity> getAll(Pageable pageable) {
        return notificationSubscriptionRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<ManageNotificationSubscribesEntity> findAll(Specification<ManageNotificationSubscribesEntity> specification, Pageable pageable) {
        return notificationSubscriptionRepository.findAll(specification,pageable);
    }

    @Override
    public List<NotificationSubscriptionDto> convertToDtos(List<ManageNotificationSubscribesEntity> entities) {
        return entities.stream().filter(o->!o.isDeleted()).map(NotificationConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public Page<NotificationSubscriptionDto> convertToDtos(Page<ManageNotificationSubscribesEntity> entities) {
        return entities.map(NotificationConvertor::toDto);
    }

}
