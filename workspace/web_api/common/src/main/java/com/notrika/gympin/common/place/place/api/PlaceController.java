package com.notrika.gympin.common.place.place.api;

import com.notrika.gympin.common.place.place.param.PlaceContractSmsParam;
import com.notrika.gympin.common.ticket.buyable.dto.TicketBuyableDto;
import com.notrika.gympin.common.util._base.base.BaseController;
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
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface PlaceController extends BaseController<PlaceParam, PlaceDto, PlaceQuery> {

    ResponseEntity<PlaceDto> changeStatus(@RequestBody PlaceParam place);

    ResponseEntity<List<PlaceDto>> getPlacesByLocation(LocationParam regionParam);

    ResponseEntity<List<PlaceDto>> getPlaceByUser(UserParam userParam);

    ResponseEntity<List<SportDto>> getSportsOfPlace(PlaceDto place);

    ResponseEntity<List<MultimediaDto>> getMultimedias(PlaceParam place);

    ResponseEntity<PlaceDto> addMultimedia(@RequestBody PlaceMultimediaParam place);

    ResponseEntity<PlaceDto> addMultimediaList(@RequestBody PlaceMultimediaListParam place);

    ResponseEntity<PlaceDto> deleteMultimedia(@RequestBody PlaceMultimediaParam place);

    ResponseEntity<InviteCode> getPlaceInviteCode(PlaceParam placeParam);

    ResponseEntity<List<TicketBuyableDto>> getBuyableByPlace(PlaceParam placeParam);

    ResponseEntity<PlaceDto> updateOrder(@RequestBody PlaceParam param);

    ResponseEntity<PlaceDto> updateContract(@RequestBody PlaceParam param);

    ResponseEntity<PlaceDto>  signContract(@RequestBody PlaceParam placeParam);

    ResponseEntity<Boolean> sendContractCode(@RequestBody PlaceContractSmsParam param);

}
