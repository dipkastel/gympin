package com.notrika.gympin.common.place.placeCounseling.service;

import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
import com.notrika.gympin.common.place.placeCounseling.dto.PlaceCounselingDto;
import com.notrika.gympin.common.place.placeCounseling.param.PlaceCounselingParam;
import com.notrika.gympin.common.place.placeCounseling.query.PlaceCounselingQuery;
import com.notrika.gympin.common.place.placeBase.param.PlaceContractSmsParam;
import com.notrika.gympin.common.place.placeBase.param.PlaceMultimediaListParam;
import com.notrika.gympin.common.place.placeBase.param.PlaceMultimediaParam;
import com.notrika.gympin.common.settings.location.param.LocationParam;
import com.notrika.gympin.common.ticket.buyable.dto.TicketBuyableDto;
import com.notrika.gympin.common.user.user.dto.InviteCode;
import com.notrika.gympin.common.user.user.param.UserParam;
import com.notrika.gympin.common.util._base.base.BaseService;

import java.util.List;

public interface PlaceCounselingService extends BaseService<PlaceCounselingParam, PlaceCounselingDto, PlaceCounselingQuery> {

    PlaceCounselingDto changeStatus(PlaceCounselingParam param);
    List<PlaceCounselingDto> getPlacesByLocation(LocationParam param);
    List<PlaceCounselingDto> getPlacesByUser(UserParam userParam);
    List<MultimediaDto> getMultimedias(PlaceCounselingParam param);
    PlaceCounselingDto addMultimedia(PlaceMultimediaParam param);
    PlaceCounselingDto addMultimediaList(PlaceMultimediaListParam param);
    PlaceCounselingDto removeMultimedia(PlaceMultimediaParam param);
    InviteCode getPlaceInviteCode(PlaceCounselingParam param);
    List<TicketBuyableDto> getBuyableByPlace(PlaceCounselingParam param);
    PlaceCounselingDto updateOrder(PlaceCounselingParam placeParam);
    PlaceCounselingDto updateContract(PlaceCounselingParam placeParam);
    PlaceCounselingDto signContract(PlaceCounselingParam placeParam);
    Boolean sendContractCode(PlaceContractSmsParam param);
    PlaceCounselingDto setDefaultMultimedia(PlaceMultimediaParam param);
}
