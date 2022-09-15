package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.location.PlaceEntity;
import com.notrika.gympin.persistence.entity.location.RegionEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaceRepository extends BaseRepository<PlaceEntity, Long> {

    //    @Query("select p from Place p where p.region.id = :#{#region.id}")
    //    List<Place> getPlacesByRegion(@Param("region") Region region);

    List<PlaceEntity> findAllByRegionAndDeletedIsFalse(RegionEntity region);

    //    @Query("select p from Place p,PlaceOwner po where p.id=po.place.id and po.user.id = :#{#user.id} ")
    //    List<Place> getPlaceByUser(User user);


    List<PlaceEntity> findAllByPlaceOwnersAndDeletedIsFalse(UserEntity user);
}
