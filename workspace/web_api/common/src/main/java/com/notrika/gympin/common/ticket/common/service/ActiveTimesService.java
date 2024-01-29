package com.notrika.gympin.common.ticket.common.service;

import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.util._base.base.BaseService;
import com.notrika.gympin.common.ticket.common.dto.ActiveTimesDto;
import com.notrika.gympin.common.ticket.common.param.ActiveTimesParam;

import java.util.List;

public interface ActiveTimesService extends BaseService<ActiveTimesParam, ActiveTimesDto, BaseQuery<?>> {


    List<ActiveTimesDto> getByHallId(Long id);

    List<ActiveTimesDto> getByPlaceId(Long id);
    List<ActiveTimesDto> addAll(List<ActiveTimesParam> params);
    List<ActiveTimesDto> activeTimesByTicketSubscribe(Long ticketSubscribeId);
}
