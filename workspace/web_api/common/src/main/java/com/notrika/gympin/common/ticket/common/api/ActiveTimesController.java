package com.notrika.gympin.common.ticket.common.api;

import com.notrika.gympin.common.place.placeGym.param.PlaceGymParam;
import com.notrika.gympin.common.ticket.common.param.ActiveTimesParam;
import com.notrika.gympin.common.util._base.base.BaseController;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.ticket.common.dto.ActiveTimesDto;
import com.notrika.gympin.common.place.hall.param.HallParam;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface ActiveTimesController extends BaseController<ActiveTimesParam, ActiveTimesDto, BaseQuery<?>> {



    ResponseEntity<List<ActiveTimesDto>> getTicketActiveTimesByHall(HallParam hallParam);

    ResponseEntity<List<ActiveTimesDto>> getTicketActiveTimesByPlace(PlaceGymParam placeParam);

    ResponseEntity<List<ActiveTimesDto>> addAll(@RequestBody List<ActiveTimesParam> activeTimesParam);
}
