package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.event.BaseEventEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public interface BaseEventRepository extends BaseRepository<BaseEventEntity, Long> {

    @Query("select count(*) from BaseEventEntity be where be.startDate >= :fromDate and be.startDate <= :toDate and (be.creatorUser= :user or :user in elements(be.participants))")
    Long getAllActiveEventOfUser(@Param("user") UserEntity user, @Param("fromDate") Date fromDate, @Param("toDate") Date toDate);

}
