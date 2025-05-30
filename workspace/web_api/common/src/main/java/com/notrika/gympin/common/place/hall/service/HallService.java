package com.notrika.gympin.common.place.hall.service;

import com.notrika.gympin.common.place.placeGym.param.PlaceGymParam;
import com.notrika.gympin.common.util._base.base.BaseService;
import com.notrika.gympin.common.place.hall.dto.HallDto;
import com.notrika.gympin.common.ticket.common.dto.ActiveTimesDto;
import com.notrika.gympin.common.place.hall.filter.HallFilter;
import com.notrika.gympin.common.place.hall.param.HallParam;
import com.notrika.gympin.common.sport.sport.param.SportParam;

import java.util.List;

public interface HallService extends BaseService<HallParam, HallDto, HallFilter> {

    List<ActiveTimesDto> getActions(HallParam hall);

    List<HallDto> getHallsByPlace(PlaceGymParam place);

    List<HallDto> getHallsBySport(SportParam sport);


}
