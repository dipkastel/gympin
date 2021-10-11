package com.notrika.gympin.common.location.service;

import com.notrika.gympin.common.location.dto.OptionOfPlaceDto;
import com.notrika.gympin.common.location.dto.PlaceDto;
import com.notrika.gympin.common.location.dto.PlaceOwnerDto;
import com.notrika.gympin.common.location.param.OptionOfPlaceParam;
import com.notrika.gympin.common.location.param.PlaceOwnerParam;
import com.notrika.gympin.common.location.param.PlaceParam;
import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.param.UserParam;

import java.util.List;

public interface LocationService {

    OptionOfPlaceDto addOptionOfPlace(OptionOfPlaceParam optionOfPlaceParam);

    List<PlaceDto> getPlaceByUser(UserParam userParam);

    PlaceOwnerDto addPlaceOwner(PlaceOwnerParam placeOwnerParam);

    List<UserDto> getOwnersPlace(PlaceParam placeParam);

    PlaceOwnerDto deletePlaceOwner(PlaceOwnerParam placeOwnerParam);
}
