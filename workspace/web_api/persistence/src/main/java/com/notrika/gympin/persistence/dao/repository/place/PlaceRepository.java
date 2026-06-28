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

    @Query("SELECT DISTINCT bdh.buyable.place \n" +
            "FROM BuyableDiscountHistoryEntity bdh \n" +
            "WHERE bdh.createdDate >= :startOfWeek \n" +
            "and bdh.buyable.place.status = 'ACTIVE' \n" +
            "AND bdh.creatorUser is not null \n" +
            "and bdh.buyable.place.deleted = false")
    List<PlaceEntity> getPlacesByTicketUpdatesDateAfter(Date startOfWeek);

    @Query("SELECT bdh.buyable.place \n" +
            "FROM BuyableDiscountHistoryEntity bdh \n" +
            "WHERE bdh.buyable.place.status = 'ACTIVE' \n" +
            "AND bdh.buyable.place.deleted = false \n" +
            "AND bdh.creatorUser is not null \n" +
            "GROUP BY bdh.buyable.place \n" +
            "HAVING MAX(bdh.createdDate) < :thresholdDate")
    List<PlaceEntity> getPlacesByTicketUpdatesDateBefore(Date thresholdDate);

}
