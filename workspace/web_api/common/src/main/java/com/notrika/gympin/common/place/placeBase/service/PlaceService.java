package com.notrika.gympin.common.place.placeBase.service;

import com.notrika.gympin.common.place.placeBase.dto.PlaceDto;
import com.notrika.gympin.common.place.placeBase.param.PlaceParam;
import com.notrika.gympin.common.place.placeBase.query.PlaceQuery;
import com.notrika.gympin.common.settings.location.param.LocationParam;
import com.notrika.gympin.common.ticket.buyable.dto.TicketBuyableDto;
import com.notrika.gympin.common.user.user.dto.InviteCode;
import com.notrika.gympin.common.user.user.param.UserParam;
import com.notrika.gympin.common.util._base.base.BaseService;

import java.util.List;

public interface PlaceService extends BaseService<PlaceParam, PlaceDto, PlaceQuery> {

    List<PlaceDto> getPlacesByLocation(LocationParam param);

    List<PlaceDto> getPlacesByUser(UserParam userParam);

    InviteCode getPlaceInviteCode(PlaceParam param);

    List<TicketBuyableDto> getBuyableByPlace(PlaceParam param);
}
