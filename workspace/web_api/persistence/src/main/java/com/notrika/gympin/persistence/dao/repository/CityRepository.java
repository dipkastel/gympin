package com.notrika.gympin.persistence.dao.repository;


import com.notrika.gympin.persistence.entity.location.CityEntity;
import com.notrika.gympin.persistence.entity.location.StateEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CityRepository extends BaseRepository<CityEntity, Long> {

    //    @Query("select c from City c where c.deleted = false and c.state.id = :#{#state.id}")
    //    List<City> getCitiesByState(@Param("state") State state);

    List<CityEntity> findAllByStateAndDeletedIsFalse(StateEntity state);

}
