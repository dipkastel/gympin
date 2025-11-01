package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.settings.links.dto.LinkDto;
import com.notrika.gympin.common.settings.notification.dto.NotificationSubscriptionDto;
import com.notrika.gympin.persistence.entity.management.links.ManageLinkEntity;
import com.notrika.gympin.persistence.entity.management.notification.ManageNotificationSubscribesEntity;

public final class NotificationConvertor {

    public static NotificationSubscriptionDto toDto(ManageNotificationSubscribesEntity entity) {
        NotificationSubscriptionDto dto = NotificationSubscriptionDto.builder()
                .id(entity.getId())
                .appName(entity.getAppName())
                .auth(entity.getAuth())
                .endpoint(entity.getEndpoint())
                .p256dh(entity.getP256dh())
                .user(UserConvertor.toDtoSimple(entity.getUser()))
                .status(entity.getStatus())
                .build();
        return dto;
    }
}
