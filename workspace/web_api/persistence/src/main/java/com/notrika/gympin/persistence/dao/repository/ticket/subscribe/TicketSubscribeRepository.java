package com.notrika.gympin.persistence.dao.repository.ticket.subscribe;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.ticket.subscribe.TicketSubscribeEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketSubscribeRepository extends BaseRepository<TicketSubscribeEntity, Long> {


        List<TicketSubscribeEntity> findAllByPlaceAndDeletedIsFalse(PlaceEntity place);
}
