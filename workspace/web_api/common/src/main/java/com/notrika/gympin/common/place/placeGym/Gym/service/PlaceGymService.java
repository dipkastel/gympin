package com.notrika.gympin.common.place.placeGym.Gym.service;

import com.notrika.gympin.common.place.placeGym.Gym.dto.PlaceGymDto;
import com.notrika.gympin.common.place.placeBase.param.PlaceContractSmsParam;
import com.notrika.gympin.common.ticket.buyable.dto.TicketBuyableDto;
import com.notrika.gympin.common.util._base.base.BaseService;
import com.notrika.gympin.common.settings.location.param.LocationParam;
import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
import com.notrika.gympin.common.place.placeBase.param.PlaceMultimediaListParam;
import com.notrika.gympin.common.place.placeBase.param.PlaceMultimediaParam;
import com.notrika.gympin.common.place.placeGym.Gym.param.PlaceGymParam;
import com.notrika.gympin.common.place.placeGym.Gym.query.PlaceGymQuery;
import com.notrika.gympin.common.place.placeGym.sport.dto.SportDto;
import com.notrika.gympin.common.user.user.dto.InviteCode;
import com.notrika.gympin.common.user.user.param.UserParam;

import java.util.List;

public interface PlaceGymService extends BaseService<PlaceGymParam, PlaceGymDto, PlaceGymQuery> {

    PlaceGymDto changeStatus(PlaceGymParam param);
    List<PlaceGymDto> getPlacesByLocation(LocationParam param);
    List<SportDto> getSportsOfPlace(PlaceGymDto place);
    List<PlaceGymDto> getPlacesByUser(UserParam userParam);
    List<MultimediaDto> getMultimedias(PlaceGymParam param);
    PlaceGymDto addMultimedia(PlaceMultimediaParam param);
    PlaceGymDto addMultimediaList(PlaceMultimediaListParam param);
    PlaceGymDto removeMultimedia(PlaceMultimediaParam param);
    InviteCode getPlaceInviteCode(PlaceGymParam param);
    List<TicketBuyableDto> getBuyableByPlace(PlaceGymParam param);
    PlaceGymDto updateOrder(PlaceGymParam placeParam);
    PlaceGymDto updateContract(PlaceGymParam placeParam);
    PlaceGymDto signContract(PlaceGymParam placeParam);
    Boolean sendContractCode(PlaceContractSmsParam param);
    PlaceGymDto setDefaultMultimedia(PlaceMultimediaParam param);
}
