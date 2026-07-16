package com.notrika.gympin.persistence.dao.repository.place.Gym;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.place.Gym.GymEntity;
import com.notrika.gympin.persistence.entity.place.Gym.GymSportEntity;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface GymSportRepository extends BaseRepository<GymSportEntity, Long> {

    @Query("select sp from SportEntity s,GymSportEntity sp where s.id=sp.sport.id and sp.place.id=:#{#place.id} and sp.deleted=0")
    List<GymSportEntity> getPlaceSportByPlace(GymEntity place);
}
