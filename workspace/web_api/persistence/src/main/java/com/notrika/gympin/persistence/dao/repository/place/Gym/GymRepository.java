package com.notrika.gympin.persistence.dao.repository.place.Gym;

import com.notrika.gympin.common.place.placeBase.enums.PlaceStatusEnum;
import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.management.location.ManageLocationEntity;
import com.notrika.gympin.persistence.entity.place.Gym.GymEntity;
import com.notrika.gympin.persistence.entity.place.Gym.SportEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GymRepository extends BaseRepository<GymEntity, Long> {

    List<GymEntity> findAllByLocationAndDeletedIsFalse(ManageLocationEntity region);

    List<GymEntity> findAllByDeletedIsFalseAndAutoDiscountIsTrueAndStatus(PlaceStatusEnum status);

    List<GymEntity> findAllByStatusAndDeletedIsFalse(PlaceStatusEnum status);

    List<GymEntity> findAllByStatusAndDeletedIsFalseAndSearchStrIsNull(PlaceStatusEnum status);

    @Query("select p from GymEntity p,PlacePersonnelEntity po where p.id=po.place.id and po.deleted = false and po.user.id = :#{#userId} ")
    List<GymEntity> getPlaceByUser(Long userId);

    @Query("select p.sport from GymSportEntity p where p.place.id=:#{#place.id} and p.deleted = false ")
    List<SportEntity> getSportsOfPlace(GymEntity place);

    @Query(value = "SELECT p FROM GymEntity p WHERE NOT EXISTS (SELECT 1 FROM p.buyables tb WHERE tb.enable = true AND tb.deleted = false and tb.startIncredible IS NOT NULL ) AND NOT EXISTS ( SELECT 1 FROM p.buyables tb where tb.beneficiary.commissionFee < :#{#minCommission} AND tb.enable = true AND tb.beneficiary.deleted = false AND tb.deleted = false ) AND p.status = 'ACTIVE' AND p.autoDiscount = true AND p.placeType = 'GYM' ")
    List<GymEntity> findAllToAddIncredible(Double minCommission);

}
