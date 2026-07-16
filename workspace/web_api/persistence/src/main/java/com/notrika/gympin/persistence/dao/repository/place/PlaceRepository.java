package com.notrika.gympin.persistence.dao.repository.place;

import com.notrika.gympin.common.place.placeBase.enums.PlaceStatusEnum;
import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.management.location.ManageLocationEntity;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface PlaceRepository extends BaseRepository<PlaceEntity, Long> {

    List<PlaceEntity> findAllByLocationAndDeletedIsFalse(ManageLocationEntity region);


    List<PlaceEntity> findAllByStatusAndDeletedIsFalse(PlaceStatusEnum status);

    @Query("select p from GymEntity p,PlacePersonnelEntity po where p.id=po.place.id and po.deleted = 0 and po.user.id = :#{#userId} ")
    List<PlaceEntity> getPlaceByUser(Long userId);

    @Query("SELECT DISTINCT bdh.buyable.place \n" +
            "FROM BuyableDiscountHistoryEntity bdh \n" +
            "WHERE bdh.createdDate >= :startOfWeek \n" +
            "and bdh.buyable.place.status = 'ACTIVE' \n" +
            "AND bdh.creatorUser is not null \n" +
            "and bdh.buyable.place.deleted = false")
    List<PlaceEntity> getPlacesByTicketUpdatesDateAfter(Date startOfWeek);

    @Query("SELECT p\n" +
            "    FROM PlaceEntity p \n" +
            "    WHERE p.status = com.notrika.gympin.common.place.placeBase.enums.PlaceStatusEnum.ACTIVE \n" +
            "      AND p.deleted = false \n" +
            "      AND p.id IN ( \n" +
            "          SELECT bdh.buyable.place.id \n" +
            "          FROM BuyableDiscountHistoryEntity bdh \n" +
            "          WHERE bdh.creatorUser IS NOT NULL \n" +
            "          GROUP BY bdh.buyable.place.id \n" +
            "          HAVING MAX(bdh.createdDate) < :thresholdDate \n" +
            "      )")
    List<PlaceEntity> getPlacesByTicketUpdatesDateBefore(Date thresholdDate);

}
