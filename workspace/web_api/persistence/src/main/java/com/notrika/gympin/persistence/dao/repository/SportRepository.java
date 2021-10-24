package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.sport.Sport;
import org.springframework.stereotype.Repository;

@Repository
public interface SportRepository extends BaseRepository<Sport, Long> {
}
