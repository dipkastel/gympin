package com.notrika.gympin.common.location.service;

import com.notrika.gympin.common.BaseService;
import com.notrika.gympin.common.location.dto.CityDto;
import com.notrika.gympin.common.location.dto.StateDto;
import com.notrika.gympin.common.location.param.CityParam;
import com.notrika.gympin.common.location.param.StateParam;
import com.notrika.gympin.common.sport.param.SportParam;

import java.util.List;

public interface CityService extends BaseService<CityParam, CityDto> {

    List<CityDto> getCitiesByState(StateParam stateParam);
}
