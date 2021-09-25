package com.notrika.gympin.common.location.service;

import com.notrika.gympin.common.BaseService;
import com.notrika.gympin.common.location.dto.RegionDto;
import com.notrika.gympin.common.location.dto.StateDto;
import com.notrika.gympin.common.location.param.CityParam;
import com.notrika.gympin.common.location.param.RegionParam;
import com.notrika.gympin.common.sport.param.SportParam;

import java.util.List;

public interface RegionService extends BaseService<RegionParam, RegionDto> {

    List<RegionDto> getRegionsByCity(CityParam cityParam);
}
