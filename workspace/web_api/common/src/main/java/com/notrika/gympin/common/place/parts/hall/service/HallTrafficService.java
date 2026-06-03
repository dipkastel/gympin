package com.notrika.gympin.common.place.parts.hall.service;

import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.util._base.base.BaseService;
import com.notrika.gympin.common.place.parts.hall.dto.HallTrafficDto;
import com.notrika.gympin.common.place.parts.hall.param.HallTrafficParam;

public interface HallTrafficService extends BaseService<HallTrafficParam, HallTrafficDto, BaseQuery<?>> {


    HallTrafficDto getLatestByHallId(Long id);

}
