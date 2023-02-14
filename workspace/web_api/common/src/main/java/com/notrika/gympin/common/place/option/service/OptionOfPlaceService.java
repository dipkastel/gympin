package com.notrika.gympin.common.place.option.service;

import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common._base.base.BaseService;
import com.notrika.gympin.common.place.option.dto.OptionOfPlaceDto;
import com.notrika.gympin.common.place.option.param.OptionOfPlaceParam;

import java.util.List;

public interface OptionOfPlaceService extends BaseService<OptionOfPlaceParam, OptionOfPlaceDto, BaseQuery<?>> {


    List<OptionOfPlaceDto> getByPlaceId(Long id);
}
