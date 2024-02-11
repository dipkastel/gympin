package com.notrika.gympin.common.place.personnel.service;

import com.notrika.gympin.common.user.user.param.UserParam;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.util._base.base.BaseService;
import com.notrika.gympin.common.place.personnel.dto.PlacePersonnelAccessDto;
import com.notrika.gympin.common.place.personnel.dto.PlacePersonnelDto;
import com.notrika.gympin.common.place.personnel.dto.PlacePersonnelBuyableAccessDto;
import com.notrika.gympin.common.place.personnel.param.PlacePersonnelAccessParam;
import com.notrika.gympin.common.place.personnel.param.PlacePersonnelBuyableAccessParam;
import com.notrika.gympin.common.place.personnel.param.PlacePersonnelParam;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import lombok.NonNull;

import java.util.List;

public interface PlacePersonnelService extends BaseService<PlacePersonnelParam, PlacePersonnelDto, BaseQuery<?>> {

    List<PlacePersonnelDto> getPersonnelByPlace(PlaceParam placeParam);
    List<PlacePersonnelDto> getPersonnelByUser(UserParam userParam);

    List<PlacePersonnelAccessDto> updatePersonnelAccess(List<PlacePersonnelAccessParam> personnelAccess);

    List<PlacePersonnelAccessDto> getUserPlaceAccess(Long placeId, Long userId);

    List<PlacePersonnelDto> getPlaceBeneficiaries(Long placeId);

    List<PlacePersonnelBuyableAccessDto> updatePersonnelBuyableAccess(List<PlacePersonnelBuyableAccessParam> personnelHallAccess);

    List<PlacePersonnelBuyableAccessDto> getUserPlaceHallAccess(Long placeId, Long userId);

    PlacePersonnelDto updatePersonnelCommissionFee(PlacePersonnelParam param);


    PlacePersonnelDto addPlacePersonnelRole(PlacePersonnelParam placePersonnelParam);

    PlacePersonnelDto deletePlacePersonnelRole(PlacePersonnelParam placePersonnelParam);
}
