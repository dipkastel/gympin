package com.notrika.gympin.common.place.placeGym.service;

import com.notrika.gympin.common.place.placeGym.dto.PlaceGymDto;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymContractSmsParam;
import com.notrika.gympin.common.ticket.buyable.dto.TicketBuyableDto;
import com.notrika.gympin.common.util._base.base.BaseService;
import com.notrika.gympin.common.settings.location.param.LocationParam;
import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymMultimediaListParam;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymMultimediaParam;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymParam;
import com.notrika.gympin.common.place.placeGym.query.PlaceGymQuery;
import com.notrika.gympin.common.sport.sport.dto.SportDto;
import com.notrika.gympin.common.user.user.dto.InviteCode;
import com.notrika.gympin.common.user.user.param.UserParam;

import java.util.List;

public interface PlaceGymService extends BaseService<PlaceGymParam, PlaceGymDto, PlaceGymQuery> {

    PlaceGymDto changeStatus(PlaceGymParam param);
    List<PlaceGymDto> getPlacesByLocation(LocationParam param);
    List<SportDto> getSportsOfPlace(PlaceGymDto place);
    List<PlaceGymDto> getPlacesByUser(UserParam userParam);
    List<MultimediaDto> getMultimedias(PlaceGymParam param);
    PlaceGymDto addMultimedia(PlaceGymMultimediaParam param);
    PlaceGymDto addMultimediaList(PlaceGymMultimediaListParam param);
    PlaceGymDto removeMultimedia(PlaceGymMultimediaParam param);
    InviteCode getPlaceInviteCode(PlaceGymParam param);
    List<TicketBuyableDto> getBuyableByPlace(PlaceGymParam param);
    PlaceGymDto updateOrder(PlaceGymParam placeParam);
    PlaceGymDto updateContract(PlaceGymParam placeParam);
    PlaceGymDto signContract(PlaceGymParam placeParam);
    Boolean sendContractCode(PlaceGymContractSmsParam param);
    PlaceGymDto setDefaultMultimedia(PlaceGymMultimediaParam param);
}
