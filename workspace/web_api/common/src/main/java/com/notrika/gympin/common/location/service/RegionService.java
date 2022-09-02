package com.notrika.gympin.common.location.service;

import com.notrika.gympin.common.BaseFilter;
import com.notrika.gympin.common.BaseService;
import com.notrika.gympin.common.location.dto.RegionDto;
import com.notrika.gympin.common.location.param.CityParam;
import com.notrika.gympin.common.location.param.RegionParam;

import java.util.List;

public interface RegionService extends BaseService<RegionParam, RegionDto, BaseFilter<?>> {

    List<RegionDto> getRegionsByCity(CityParam cityParam);
}
