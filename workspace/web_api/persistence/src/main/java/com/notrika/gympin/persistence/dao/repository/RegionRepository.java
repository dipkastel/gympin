package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.location.City;
import com.notrika.gympin.persistence.entity.location.Region;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RegionRepository extends BaseRepository<Region, Long> {
   // @Query("select c from Region c where c.deleted = false and c.city.id = :#{#city.id}")
    List<Region> getRegionsByCity(@Param("city") City city);
}