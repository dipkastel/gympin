package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.location.Place;
import com.notrika.gympin.persistence.entity.location.Region;
import com.notrika.gympin.persistence.entity.user.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaceRepository extends BaseRepository<Place, Long> {

    //@Query("select p from Place p where p.region.id = :#{#region.id}")
    List<Place> getPlacesByRegion(@Param("region") Region region);

    //@Query("select p from Place p,PlaceOwner po where p.id=po.place.id and po.user.id = :#{#user.id} ")
    List<Place> getPlaceByUser(User user);
}
