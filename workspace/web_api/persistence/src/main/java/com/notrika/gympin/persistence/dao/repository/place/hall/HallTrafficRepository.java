package com.notrika.gympin.persistence.dao.repository.place.hall;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.place.hall.HallTrafficEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface HallTrafficRepository extends BaseRepository<HallTrafficEntity,Long> {


    HallTrafficEntity findTopByHallIdAndDeletedFalseOrderByIdDesc(Long hallId);
}
