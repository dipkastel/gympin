package com.notrika.gympin.persistence.dao.repository.settings;

import com.notrika.gympin.common.settings.notification.enums.NotificationSubscriberStatus;
import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.management.notification.ManageNotificationEntity;
import com.notrika.gympin.persistence.entity.management.notification.ManageNotificationSubscribesEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ManageNotificationSubscriptionRepository extends BaseRepository<ManageNotificationSubscribesEntity, Long> {

    List<ManageNotificationSubscribesEntity> findAllByDeletedIsFalseAndStatusIs(NotificationSubscriberStatus status);
    List<ManageNotificationSubscribesEntity> findAllByDeletedIsFalseAndAppNameLikeAndStatusIs(String appName,NotificationSubscriberStatus status);

    List<ManageNotificationSubscribesEntity> findAllByDeletedIsFalseAndIdIn(List<Long> ids);
}
