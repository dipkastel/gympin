package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.location.GateEntity;
import com.notrika.gympin.persistence.entity.location.Place;
import com.notrika.gympin.persistence.entity.sport.Sport;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GateRepository extends BaseRepository<GateEntity,Long>{

    List<GateEntity> findAllByPlaceAndDeletedIsFalse(Place place);

    List<GateEntity> findAllBySportAndDeletedIsFalse(Sport sport);

}
