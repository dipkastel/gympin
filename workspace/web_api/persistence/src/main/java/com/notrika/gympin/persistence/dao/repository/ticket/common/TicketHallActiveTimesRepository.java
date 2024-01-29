package com.notrika.gympin.persistence.dao.repository.ticket.common;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.ticket.common.TicketHallActiveTimeEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketHallActiveTimesRepository extends BaseRepository<TicketHallActiveTimeEntity,Long> {


    List<TicketHallActiveTimeEntity> findAllByHallIdAndDeletedFalse(Long HallId);

    List<TicketHallActiveTimeEntity> findAllByHallPlaceIdAndHallDeletedFalseAndDeletedFalse(Long placeId);
    List<TicketHallActiveTimeEntity> findAllByDeletedFalseAndTicketSubscribes_Id(Long subscribeId);
}
