package com.notrika.gympin.common.place.about.service;

import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common._base.base.BaseService;
import com.notrika.gympin.common.place.about.dto.PlaceAboutDto;
import com.notrika.gympin.common.place.about.param.PlaceAboutParam;

import java.util.List;

public interface PlaceAboutService extends BaseService<PlaceAboutParam, PlaceAboutDto, BaseQuery<?>> {


    List<PlaceAboutDto> getByPlaceId(Long id);
}
