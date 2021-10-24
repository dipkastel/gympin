package com.notrika.gympin.persistence.dao.repository;


import com.notrika.gympin.persistence.entity.location.City;
import com.notrika.gympin.persistence.entity.location.State;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CityRepository extends BaseRepository<City, Long> {

    @Query("select c from City c where c.deleted = false and c.state.id = :#{#state.id}")
    List<City> getCitiesByState(@Param("state") State state);

}
