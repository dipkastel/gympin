package com.notrika.gympin.dao.repository;


import com.notrika.gympin.dao.location.City;
import com.notrika.gympin.dao.location.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CityRepository extends JpaRepository<City, Long> {

    @Query("select c from City c where c.state.id = :#{#state.id}")
    List<City> getCitiesByState(@Param("state") State state);

}
