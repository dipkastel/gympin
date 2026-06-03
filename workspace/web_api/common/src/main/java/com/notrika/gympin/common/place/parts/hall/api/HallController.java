package com.notrika.gympin.common.place.parts.hall.api;

import com.notrika.gympin.common.util._base.base.BaseController;
import com.notrika.gympin.common.place.parts.hall.dto.HallDto;
import com.notrika.gympin.common.place.parts.hall.filter.HallFilter;
import com.notrika.gympin.common.place.parts.hall.param.HallParam;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymParam;
import com.notrika.gympin.common.sport.sport.param.SportParam;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface HallController extends BaseController<HallParam, HallDto, HallFilter> {

    ResponseEntity<List<HallDto>> getHallsByPlace(PlaceGymParam place);

    ResponseEntity<List<HallDto>> getHallsBySport(SportParam sport);

}
