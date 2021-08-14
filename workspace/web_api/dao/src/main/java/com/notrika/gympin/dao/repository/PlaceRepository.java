package com.notrika.gympin.dao.repository;

import com.notrika.gympin.dao.location.Place;
import com.notrika.gympin.dao.location.Region;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaceRepository extends BaseRepository<Place, Long> {
    @Query("select c from Place c where c.region.id = :#{#region.id}")
    List<Place> getPlacesByRegion(@Param("region") Region region);
}
