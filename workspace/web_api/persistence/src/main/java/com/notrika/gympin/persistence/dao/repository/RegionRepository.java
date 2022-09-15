package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.location.CityEntity;
import com.notrika.gympin.persistence.entity.location.RegionEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RegionRepository extends BaseRepository<RegionEntity, Long> {
    // @Query("select c from Region c where c.deleted = false and c.city.id = :#{#city.id}")
    //    List<Region> getRegionsByCity(@Param("city") City city);

    List<RegionEntity> findAllByCityAndDeletedIsFalse(CityEntity city);

}
