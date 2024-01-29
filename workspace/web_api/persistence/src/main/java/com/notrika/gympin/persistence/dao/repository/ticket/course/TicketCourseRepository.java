package com.notrika.gympin.persistence.dao.repository.ticket.course;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.ticket.course.TicketCourseEntity;
import com.notrika.gympin.persistence.entity.ticket.subscribe.TicketSubscribeEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketCourseRepository extends BaseRepository<TicketCourseEntity, Long> {

    List<TicketCourseEntity> findAllByPlaceAndDeletedIsFalse(PlaceEntity place);
}
