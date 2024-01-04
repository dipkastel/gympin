package com.notrika.gympin.common.place.place.service;

import com.notrika.gympin.common.ticket.buyable.dto.TicketBuyableDto;
import com.notrika.gympin.common.util._base.base.BaseService;
import com.notrika.gympin.common.settings.location.param.LocationParam;
import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
import com.notrika.gympin.common.place.place.dto.PlaceDto;
import com.notrika.gympin.common.place.place.param.PlaceMultimediaListParam;
import com.notrika.gympin.common.place.place.param.PlaceMultimediaParam;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.place.place.query.PlaceQuery;
import com.notrika.gympin.common.sport.sport.dto.SportDto;
import com.notrika.gympin.common.user.user.dto.InviteCode;
import com.notrika.gympin.common.user.user.param.UserParam;

import java.util.List;

public interface PlaceService extends BaseService<PlaceParam, PlaceDto, PlaceQuery> {

    PlaceDto changeStatus(PlaceParam param);
    List<PlaceDto> getPlacesByLocation(LocationParam param);
    List<SportDto> getSportsOfPlace(PlaceDto place);
    List<PlaceDto> getPlacesByUser(UserParam userParam);
    List<MultimediaDto> getMultimedias(PlaceParam param);
    PlaceDto addMultimedia(PlaceMultimediaParam param);
    PlaceDto addMultimediaList(PlaceMultimediaListParam param);
    PlaceDto removeMultimedia(PlaceMultimediaParam param);
    InviteCode getPlaceInviteCode(PlaceParam param);
    List<TicketBuyableDto> getBuyableByPlace(PlaceParam param);
}
