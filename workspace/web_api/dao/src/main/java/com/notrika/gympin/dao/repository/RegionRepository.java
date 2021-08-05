package com.notrika.gympin.dao.repository;

import com.notrika.gympin.dao.location.City;
import com.notrika.gympin.dao.location.Region;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RegionRepository extends JpaRepository<Region, Long> {
    @Query("select c from Region c where c.city.id = :#{#city.id}")
    List<Region> getRegionsByCity(@Param("city") City city);
}
