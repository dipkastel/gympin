package com.notrika.gympin.persistence.dao.repository.place;

import com.notrika.gympin.common.place.placeBase.enums.PlaceStatusEnum;
import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.management.location.ManageLocationEntity;
import com.notrika.gympin.persistence.entity.place.PlaceCounselingEntity;
import com.notrika.gympin.persistence.entity.place.PlaceGymEntity;
import com.notrika.gympin.persistence.entity.sport.SportEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaceCounselingRepository extends BaseRepository<PlaceCounselingEntity, Long> {

    List<PlaceCounselingEntity> findAllByLocationAndDeletedIsFalse(ManageLocationEntity region);

    List<PlaceCounselingEntity> findAllByDeletedIsFalseAndAutoDiscountIsTrue();

    List<PlaceCounselingEntity> findAllByStatusAndDeletedIsFalse(PlaceStatusEnum status);

    @Query("select p from PlaceCounselingEntity p,PlacePersonnelEntity po where p.id=po.place.id and po.deleted = 0 and po.user.id = :#{#userId} ")
    List<PlaceCounselingEntity> getPlaceByUser(Long userId);


}
