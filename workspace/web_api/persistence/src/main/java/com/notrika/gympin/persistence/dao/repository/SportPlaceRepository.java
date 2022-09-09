package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.location.PlaceEntity;
import com.notrika.gympin.persistence.entity.sport.SportEntity;
import com.notrika.gympin.persistence.entity.sportplace.SportPlaceEntity;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SportPlaceRepository extends BaseRepository<SportPlaceEntity, Long> {

    @Query("select s from SportEntity s,SportPlaceEntity sp where s.id=sp.sport.id and sp.place.id=:#{#place.id}")
    List<SportEntity> getSportPlaceByPlace(PlaceEntity place);
}
