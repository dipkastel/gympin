package com.notrika.gympin.persistence.repository;

import com.notrika.gympin.dao.sport.Sport;
import org.springframework.stereotype.Repository;

@Repository
public interface SportRepository extends BaseRepository<Sport, Long> {
}
