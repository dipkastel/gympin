package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.place.personnel.PlacePersonnelAccessEntity;
import com.notrika.gympin.persistence.entity.place.personnel.PlacePersonnelGateAccessEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface PlacePersonnelGateAccessRepository extends BaseRepository<PlacePersonnelGateAccessEntity, Long> {

}
