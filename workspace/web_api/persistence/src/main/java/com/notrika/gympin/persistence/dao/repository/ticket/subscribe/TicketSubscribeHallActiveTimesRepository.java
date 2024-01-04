package com.notrika.gympin.persistence.dao.repository.ticket.subscribe;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.ticket.subscribe.TicketSubscribeHallActiveTime;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketSubscribeHallActiveTimesRepository extends BaseRepository<TicketSubscribeHallActiveTime,Long> {


    List<TicketSubscribeHallActiveTime> findAllByHallIdAndDeletedFalse(Long HallId);

    List<TicketSubscribeHallActiveTime> findAllByHallPlaceIdAndHallDeletedFalseAndDeletedFalse(Long placeId);
    List<TicketSubscribeHallActiveTime> findAllByDeletedFalseAndTicketSubscribes_Id(Long subscribeId);
}
