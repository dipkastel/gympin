package com.notrika.gympin.common.note.service;

import com.notrika.gympin.common._base.base.BaseService;
import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common.corporate.corporate.param.CorporateParam;
import com.notrika.gympin.common.note.dto.NoteDto;
import com.notrika.gympin.common.note.param.NoteParam;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.rate.place.dto.RatePlaceDto;
import com.notrika.gympin.common.rate.place.param.RatePlaceParam;
import com.notrika.gympin.common.ticket.param.TicketParam;
import com.notrika.gympin.common.user.param.UserParam;

import java.util.List;

public interface NoteService extends BaseService<NoteParam, NoteDto, BaseQuery<?>> {
    List<NoteDto> getByPlace(PlaceParam placeParam);
    List<NoteDto> getByCorporate(CorporateParam corporateParam);
    List<NoteDto> getByUser(UserParam userParam);
    List<NoteDto> getByTicket(TicketParam ticketParam);
}
