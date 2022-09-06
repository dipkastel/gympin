package com.notrika.gympin.common.location.service;

import com.notrika.gympin.common.BaseFilter;
import com.notrika.gympin.common.BaseService;
import com.notrika.gympin.common.location.dto.CityDto;
import com.notrika.gympin.common.location.param.CityParam;
import com.notrika.gympin.common.location.param.StateParam;

import java.util.List;

public interface CityService extends BaseService<CityParam, CityDto, BaseFilter<?>> {

    List<CityDto> getCitiesByState(StateParam stateParam);
}
