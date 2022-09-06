package com.notrika.gympin.common.location.api;

import com.notrika.gympin.common.BaseController;
import com.notrika.gympin.common.BaseFilter;
import com.notrika.gympin.common.location.dto.CityDto;
import com.notrika.gympin.common.location.param.CityParam;
import com.notrika.gympin.common.location.param.StateParam;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CityController extends BaseController<CityParam, CityDto, BaseFilter<?>> {

    ResponseEntity<List<CityDto>> getCitiesByState(StateParam stateParam);

}
