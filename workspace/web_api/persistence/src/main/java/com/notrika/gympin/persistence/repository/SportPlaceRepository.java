package com.notrika.gympin.persistence.repository;

import com.notrika.gympin.dao.location.Place;
import com.notrika.gympin.dao.sport.Sport;
import com.notrika.gympin.dao.sportplace.SportPlace;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SportPlaceRepository extends BaseRepository<SportPlace,Long> {

    //@Query("select s from Sport s,SportPlace sp where s.id=sp.sport.id and sp.place.id=:#{#place.id}")
    List<Sport> getSportPlaceByPlace(Place place);
}
