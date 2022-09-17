package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.location.PlaceEntity;
import com.notrika.gympin.persistence.entity.location.RegionEntity;
import com.notrika.gympin.persistence.entity.sport.SportEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import org.springframework.data.jpa.repository.Query;
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

    @Query("select distinct s from PlaceEntity p,GateEntity g,SportEntity s where p.id=:#{#place.id} and p.id=g.place.id and s.id=g.sport.id")
    List<SportEntity> getSportsOfPlace(PlaceEntity place);

}
