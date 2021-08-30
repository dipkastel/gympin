package com.notrika.gympin.persistence.repository;


import com.notrika.gympin.dao.location.City;
import com.notrika.gympin.dao.location.State;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CityRepository extends BaseRepository<City, Long> {

    @Query("select c from City c where c.isDeleted = false and c.state.id = :#{#state.id}")
    List<City> getCitiesByState(@Param("state") State state);

}
