package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.sport.SportMultimediaEntity;
import com.notrika.gympin.persistence.entity.sport.SportEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SportMultimediaRepository extends BaseRepository<SportMultimediaEntity, Long> {

    List<SportMultimediaEntity> findBySport(SportEntity sport);

}
