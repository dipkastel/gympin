package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.communication.notification.NotificationEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends BaseRepository<NotificationEntity, Long> {

    List<NotificationEntity> findAllByUserAndDeletedIsFalse(UserEntity user);

}
