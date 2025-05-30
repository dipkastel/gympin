package com.notrika.gympin.persistence.dao.repository.sport;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.place.PlaceGymEntity;
import com.notrika.gympin.persistence.entity.sport.placeSport.PlaceSportEntity;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PlaceSportRepository extends BaseRepository<PlaceSportEntity, Long> {

    @Query("select sp from SportEntity s,PlaceSportEntity sp where s.id=sp.sport.id and sp.place.id=:#{#place.id} and sp.deleted=0")
    List<PlaceSportEntity> getPlaceSportByPlace(PlaceGymEntity place);
}
