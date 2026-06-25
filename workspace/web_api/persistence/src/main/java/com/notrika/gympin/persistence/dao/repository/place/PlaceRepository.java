package com.notrika.gympin.persistence.dao.repository.place;

import com.notrika.gympin.common.place.placeBase.enums.PlaceStatusEnum;
import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.management.location.ManageLocationEntity;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.place.PlaceGymEntity;
import com.notrika.gympin.persistence.entity.sport.SportEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Repository
public interface PlaceRepository extends BaseRepository<PlaceEntity, Long> {

    List<PlaceEntity> findAllByLocationAndDeletedIsFalse(ManageLocationEntity region);


    List<PlaceEntity> findAllByStatusAndDeletedIsFalse(PlaceStatusEnum status);

    @Query("select p from PlaceGymEntity p,PlacePersonnelEntity po where p.id=po.place.id and po.deleted = 0 and po.user.id = :#{#userId} ")
    List<PlaceEntity> getPlaceByUser(Long userId);

    @Query("SELECT  tbdh.buyable.place from BuyableDiscountHistoryEntity tbdh where tbdh.creatorUser is Not null AND tbdh.createdDate > :date group by tbdh.buyable.place.id order by max(tbdh.createdDate) DESC")
    List<PlaceEntity> getPlacesByTicketUpdatesDate(Date date);

}
