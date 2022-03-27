package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.event.WalkingEventEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface WalkingEventRepository extends BaseRepository<WalkingEventEntity, Long> {
}