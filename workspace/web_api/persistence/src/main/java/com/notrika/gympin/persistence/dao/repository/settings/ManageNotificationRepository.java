package com.notrika.gympin.persistence.dao.repository.settings;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.management.notification.ManageNotificationEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ManageNotificationRepository extends BaseRepository<ManageNotificationEntity, Long> {

    List<ManageNotificationEntity> findAllByUserAndDeletedIsFalse(UserEntity user);


}
