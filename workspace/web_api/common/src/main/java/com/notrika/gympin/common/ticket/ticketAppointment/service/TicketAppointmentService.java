package com.notrika.gympin.common.ticket.ticketAppointment.service;

import com.notrika.gympin.common.place.placeCounseling.Counseling.param.CounselingParam;
import com.notrika.gympin.common.ticket.buyable.dto.TicketDiscountHistoryDto;
import com.notrika.gympin.common.ticket.ticketAppointment.dto.TicketAppointmentDto;
import com.notrika.gympin.common.ticket.ticketAppointment.param.TicketAppointmentParam;
import com.notrika.gympin.common.ticket.ticketAppointment.query.TicketAppointmentQuery;
import com.notrika.gympin.common.util._base.base.BaseService;

import java.util.List;

public interface TicketAppointmentService extends BaseService<TicketAppointmentParam, TicketAppointmentDto, TicketAppointmentQuery> {

    List<TicketAppointmentDto> getTicketAppointmentByCounseling(CounselingParam place);
    TicketAppointmentDto ChangeTicketAppointmentStatus(TicketAppointmentParam ticketAppointmentParam);
    List<TicketDiscountHistoryDto> getTicketAppointmentDiscountHistory(Long ticketAppointmentId);
    List<TicketDiscountHistoryDto> getTicketAppointmentDiscountHistoryByUser(Long ticketAppintmentId);


}
