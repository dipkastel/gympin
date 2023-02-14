package com.notrika.gympin.common.place.personnel.service;

import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common._base.base.BaseService;
import com.notrika.gympin.common.place.personnel.dto.PlacePersonnelAccessDto;
import com.notrika.gympin.common.place.personnel.dto.PlacePersonnelDto;
import com.notrika.gympin.common.place.personnel.param.PlacePersonnelAccessParam;
import com.notrika.gympin.common.place.personnel.param.PlacePersonnelParam;
import com.notrika.gympin.common.place.place.param.PlaceParam;

import java.util.List;

public interface PlacePersonnelService extends BaseService<PlacePersonnelParam, PlacePersonnelDto, BaseQuery<?>> {

    List<PlacePersonnelDto> getPersonnelByPlace(PlaceParam placeParam);

    List<PlacePersonnelAccessDto> updatePersonnelAccess(List<PlacePersonnelAccessParam> personnelAccess);

    List<PlacePersonnelAccessDto> getUserPlaceAccess(Long placeId, Long userId);
}
