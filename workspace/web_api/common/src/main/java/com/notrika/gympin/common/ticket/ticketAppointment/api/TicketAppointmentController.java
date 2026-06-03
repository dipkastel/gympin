package com.notrika.gympin.common.ticket.ticketAppointment.api;

import com.notrika.gympin.common.place.placeCounseling.param.PlaceCounselingParam;
import com.notrika.gympin.common.ticket.buyable.dto.TicketDiscountHistoryDto;
import com.notrika.gympin.common.ticket.ticketAppointment.dto.TicketAppointmentDto;
import com.notrika.gympin.common.ticket.ticketAppointment.param.TicketAppointmentParam;
import com.notrika.gympin.common.ticket.ticketAppointment.query.TicketAppointmentQuery;
import com.notrika.gympin.common.util._base.base.BaseController;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface TicketAppointmentController extends BaseController<TicketAppointmentParam, TicketAppointmentDto, TicketAppointmentQuery> {

    ResponseEntity<List<TicketAppointmentDto>> getTicketAppointmentByPlace(PlaceCounselingParam place);
    ResponseEntity<List<TicketDiscountHistoryDto>> getTicketAppointmentDiscountHistory(Long ticketAppointmentId);
    ResponseEntity<TicketAppointmentDto> changeTicketAppointmentStatus(TicketAppointmentParam ticketAppointmentParam);

}
