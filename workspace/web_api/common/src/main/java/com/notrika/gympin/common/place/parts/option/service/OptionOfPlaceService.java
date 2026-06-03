package com.notrika.gympin.common.place.parts.option.service;

import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.util._base.base.BaseService;
import com.notrika.gympin.common.place.parts.option.dto.OptionOfPlaceDto;
import com.notrika.gympin.common.place.parts.option.param.OptionOfPlaceParam;

import java.util.List;

public interface OptionOfPlaceService extends BaseService<OptionOfPlaceParam, OptionOfPlaceDto, BaseQuery<?>> {


    List<OptionOfPlaceDto> getByPlaceId(Long id);
}
