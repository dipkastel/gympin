package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.location.Place;
import com.notrika.gympin.persistence.entity.sport.Sport;
import com.notrika.gympin.persistence.entity.sportplace.SportPlace;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SportPlaceRepository extends BaseRepository<SportPlace, Long> {

    @Query("select s from Sport s,SportPlace sp where s.id=sp.sport.id and sp.place.id=:#{#place.id}")
    List<Sport> getSportPlaceByPlace(Place place);
}
