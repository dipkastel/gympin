package com.notrika.gympin.common.ticket.ticketSubscribe.service;

import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.util._base.base.BaseService;
import com.notrika.gympin.common.ticket.ticketSubscribe.dto.ActiveTimesDto;
import com.notrika.gympin.common.ticket.ticketSubscribe.param.ActiveTimesParam;

import java.util.List;

public interface ActiveTimesService extends BaseService<ActiveTimesParam, ActiveTimesDto, BaseQuery<?>> {


    List<ActiveTimesDto> getByHallId(Long id);

    List<ActiveTimesDto> getByPlaceId(Long id);
    List<ActiveTimesDto> addAll(List<ActiveTimesParam> params);
    List<ActiveTimesDto> activeTimesByTicketSubscribe(Long ticketSubscribeId);
}
