package com.notrika.gympin.persistence.dao.repository.ticket.appointment;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.ticket.appointment.TicketAppointmentEntity;
import com.notrika.gympin.persistence.entity.ticket.subscribe.TicketSubscribeEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketAppointmentRepository extends BaseRepository<TicketAppointmentEntity, Long> {


        List<TicketAppointmentEntity> findAllByPlaceAndDeletedIsFalse(PlaceEntity place);
}
