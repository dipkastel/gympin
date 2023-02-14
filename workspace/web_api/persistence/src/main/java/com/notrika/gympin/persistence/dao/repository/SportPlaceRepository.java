package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.sport.SportEntity;
import com.notrika.gympin.persistence.entity.sportplace.SportPlaceEntity;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SportPlaceRepository extends BaseRepository<SportPlaceEntity, Long> {

    @Query("select sp from SportEntity s,SportPlaceEntity sp where s.id=sp.sport.id and sp.place.id=:#{#place.id} and sp.deleted=0")
    List<SportPlaceEntity> getSportPlaceByPlace(PlaceEntity place);
}
