package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.event.BaseEventEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface BaseEventRepository extends BaseRepository<BaseEventEntity, Long> {

}
