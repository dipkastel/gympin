package com.notrika.gympin.persistence.dao.repository.place;

import com.notrika.gympin.common.place.placeBase.enums.PlaceStatusEnum;
import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.management.location.ManageLocationEntity;
import com.notrika.gympin.persistence.entity.place.PlaceGymEntity;
import com.notrika.gympin.persistence.entity.sport.SportEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaceGymRepository extends BaseRepository<PlaceGymEntity, Long> {

    List<PlaceGymEntity> findAllByLocationAndDeletedIsFalse(ManageLocationEntity region);

    List<PlaceGymEntity> findAllByDeletedIsFalseAndAutoDiscountIsTrue();

    List<PlaceGymEntity> findAllByStatusAndDeletedIsFalse(PlaceStatusEnum status);

    List<PlaceGymEntity> findAllByStatusAndDeletedIsFalseAndSearchStrIsNull(PlaceStatusEnum status);

    @Query("select p from PlaceGymEntity p,PlacePersonnelEntity po where p.id=po.place.id and po.deleted = 0 and po.user.id = :#{#userId} ")
    List<PlaceGymEntity> getPlaceByUser(Long userId);

    @Query("select p.sport from PlaceSportEntity p where p.place.id=:#{#place.id} and p.deleted = 0")
    List<SportEntity> getSportsOfPlace(PlaceGymEntity place);

}
