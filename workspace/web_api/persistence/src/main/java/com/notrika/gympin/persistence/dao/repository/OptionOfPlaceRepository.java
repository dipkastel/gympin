package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.place.option.OptionOfPlaceEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OptionOfPlaceRepository extends BaseRepository<OptionOfPlaceEntity, Long> {


    @Query("select a from OptionOfPlaceEntity a where a.place.id=:#{#id} and a.deleted=false ")
    List<OptionOfPlaceEntity> getByPlaceId(Long id);
}
