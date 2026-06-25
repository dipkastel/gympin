package com.notrika.gympin.persistence.dao.repository.ticket.subscribe;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.ticket.subscribe.TicketSubscribeEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketSubscribeRepository extends BaseRepository<TicketSubscribeEntity, Long> {


    List<TicketSubscribeEntity> findAllByPlaceAndDeletedIsFalse(PlaceEntity place);

    List<TicketSubscribeEntity> findAllByStartIncredibleIsNotNullAndDeletedIsFalse();

    @Query("SELECT tse from TicketSubscribeEntity tse where tse.startIncredible is null and tse.deleted = 0 and tse.valuePrice > tse.placePrice")
    List<TicketSubscribeEntity> findAllNewIncrediblesByPlace();

    @Query("SELECT tse from TicketSubscribeEntity tse where tse.deleted = false and tse.placePrice>(tse.price/((100-:#{#minimum})/100)) and tse.place.status = 'ACTIVE' and tse.enable = true and tse.startIncredible = NULL")
    List<TicketSubscribeEntity> findAllNewIncrediblesByDiscount(Integer minimum);

}
