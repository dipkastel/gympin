package com.notrika.gympin.persistence.dao.repository;

import com.notrika.gympin.persistence.entity.location.LocationEntity;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.sport.SportEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaceRepository extends BaseRepository<PlaceEntity, Long> {

    List<PlaceEntity> findAllByLocationAndDeletedIsFalse(LocationEntity region);

    List<PlaceEntity> findAllByDeletedIsFalseAndAutoDiscountIsTrue();

    @Query("select p from PlaceEntity p,PlacePersonnelEntity po where p.id=po.place.id and po.deleted = 0 and po.user.id = :#{#userId} ")
    List<PlaceEntity> getPlaceByUser(Long userId);

    @Query("select distinct s from PlaceEntity p,GateEntity g,SportEntity s where p.id=:#{#place.id} and p.id=g.place.id and s.id=g.sport.id")
    List<SportEntity> getSportsOfPlace(PlaceEntity place);

}
