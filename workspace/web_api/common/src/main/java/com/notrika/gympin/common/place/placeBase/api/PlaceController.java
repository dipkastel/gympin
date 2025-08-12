package com.notrika.gympin.common.place.placeBase.api;

import com.notrika.gympin.common.place.placeBase.dto.PlaceDto;
import com.notrika.gympin.common.place.placeBase.param.PlaceParam;
import com.notrika.gympin.common.place.placeBase.query.PlaceQuery;
import com.notrika.gympin.common.settings.location.param.LocationParam;
import com.notrika.gympin.common.ticket.buyable.dto.TicketBuyableDto;
import com.notrika.gympin.common.user.user.dto.InviteCode;
import com.notrika.gympin.common.user.user.param.UserParam;
import com.notrika.gympin.common.util._base.base.BaseController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface PlaceController extends BaseController<PlaceParam, PlaceDto, PlaceQuery> {


    ResponseEntity<List<PlaceDto>> getPlacesByLocation(LocationParam regionParam);

    ResponseEntity<List<PlaceDto>> getPlaceByUser(UserParam userParam);

    ResponseEntity<InviteCode> getPlaceInviteCode(PlaceParam placeParam);

    ResponseEntity<List<TicketBuyableDto>> getBuyableByPlace(PlaceParam placeParam);

}
