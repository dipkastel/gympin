package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.multimedia.SportMultimedia;
import com.notrika.gympin.persistence.entity.sport.Sport;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SportMultimediaRepository extends BaseRepository<SportMultimedia,Long> {

    List<SportMultimedia> findBySport(Sport sport);

}
