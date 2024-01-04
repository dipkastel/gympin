package com.notrika.gympin.common.place.hall.service;

import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.util._base.base.BaseService;
import com.notrika.gympin.common.place.hall.dto.HallTrafficDto;
import com.notrika.gympin.common.place.hall.param.HallTrafficParam;

public interface HallTrafficService extends BaseService<HallTrafficParam, HallTrafficDto, BaseQuery<?>> {


    HallTrafficDto getLatestByHallId(Long id);

}
