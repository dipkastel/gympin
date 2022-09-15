package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.event.BaseEventEntity;
import com.notrika.gympin.persistence.entity.event.EventParticipantEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventParticipantRepository extends BaseRepository<EventParticipantEntity, Long> {

    @Query("select c.user from EventParticipantEntity c where c.deleted=false and c.event.id = :#{#event.id}")
    List<UserEntity> getUserByEventAndDeleted(BaseEventEntity event);

    List<EventParticipantEntity> findAllByUserAndDeletedIsFalse(UserEntity user);

    EventParticipantEntity findByEventAndUserAndDeletedIsFalse(BaseEventEntity event, UserEntity user);

    Long countAllByEventAndDeletedIsFalse(BaseEventEntity event);

}
