package com.notrika.gympin.persistence.dao.repository.place;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.place.option.PlaceOptionOfPlaceEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PlaceOptionOfPlaceRepository extends BaseRepository<PlaceOptionOfPlaceEntity, Long> {


    @Query("select a from PlaceOptionOfPlaceEntity a where a.place.id=:#{#id} and a.deleted=false ")
    List<PlaceOptionOfPlaceEntity> getByPlaceId(Long id);
}
