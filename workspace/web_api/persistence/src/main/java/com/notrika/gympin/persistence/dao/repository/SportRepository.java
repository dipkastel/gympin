package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.sport.SportEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface SportRepository extends BaseRepository<SportEntity, Long> {
}
