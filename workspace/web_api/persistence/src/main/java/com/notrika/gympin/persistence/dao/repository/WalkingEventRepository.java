package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.event.EventParticipantEntity;
import com.notrika.gympin.persistence.entity.event.WalkingEventEntity;
import com.notrika.gympin.persistence.entity.user.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface WalkingEventRepository extends BaseRepository<WalkingEventEntity, Long> {

/*    @Query("select w.* from WalkingEventEntity w,BaseEventEntity b, EventParticipantEntity p, User u where (w.id=b.id and b.creatorUser=u.id and u.id= :#{#userId}) or (w.id=b.id" +
            " and p.user.id=u.id and u.id= :#{#userId})")
    List<WalkingEventEntity> getAllEventOfUser(Long userId);*/

    List<WalkingEventEntity> findAllByCreatorUserAndDeleted(User ownerUser, boolean isDeleted);

    List<WalkingEventEntity> findAllByParticipantsInAndDeleted(Set<EventParticipantEntity> participants, boolean deleted);

//    List<WalkingEventEntity> findAllByParticipants();


}