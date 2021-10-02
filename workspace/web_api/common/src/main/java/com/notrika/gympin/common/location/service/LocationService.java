package com.notrika.gympin.common.location.service;

import com.notrika.gympin.common.location.dto.*;
import com.notrika.gympin.common.location.param.*;
import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.param.UserParam;

import java.util.List;

public interface LocationService {

    OptionOfPlaceDto addOptionOfPlace(OptionOfPlaceParam optionOfPlaceParam);

    List<PlaceDto> getPlaceByUser(UserParam userParam);

    PlaceOwnerDto addPlaceOwner(PlaceOwnerParam placeOwnerParam);

    List<UserDto> getOwnersPlace(PlaceParam placeParam);

    void deletePlaceOwner(PlaceOwnerParam placeOwnerParam);
}
