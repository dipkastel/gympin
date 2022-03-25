package com.notrika.gympin.common.location.api;

import com.notrika.gympin.common.BaseController;
import com.notrika.gympin.common.location.dto.RegionDto;
import com.notrika.gympin.common.location.param.CityParam;
import com.notrika.gympin.common.location.param.RegionParam;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface RegionController extends BaseController<RegionParam, RegionDto> {

    ResponseEntity<List<RegionDto>> getRegionsByCity(CityParam cityParam);

}
