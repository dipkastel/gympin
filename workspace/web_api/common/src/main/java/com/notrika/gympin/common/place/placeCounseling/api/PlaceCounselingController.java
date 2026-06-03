package com.notrika.gympin.common.place.placeCounseling.api;

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
import com.notrika.gympin.common.util._base.base.BaseController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface PlaceCounselingController extends BaseController<PlaceCounselingParam, PlaceCounselingDto, PlaceCounselingQuery> {

    ResponseEntity<PlaceCounselingDto> changeStatus(@RequestBody PlaceCounselingParam place);

    ResponseEntity<List<PlaceCounselingDto>> getPlacesByLocation(LocationParam regionParam);

    ResponseEntity<List<PlaceCounselingDto>> getPlaceByUser(UserParam userParam);

    ResponseEntity<List<MultimediaDto>> getMultimedias(PlaceCounselingParam place);

    ResponseEntity<PlaceCounselingDto> getMyPlaceCounselingById(Long id);

    ResponseEntity<PlaceCounselingDto> addMultimedia(@RequestBody PlaceMultimediaParam place);

    ResponseEntity<PlaceCounselingDto> addMultimediaList(@RequestBody PlaceMultimediaListParam place);

    ResponseEntity<PlaceCounselingDto> setDefaultMultimedia(@RequestBody PlaceMultimediaParam place);

    ResponseEntity<PlaceCounselingDto> deleteMultimedia(@RequestBody PlaceMultimediaParam place);

    ResponseEntity<InviteCode> getPlaceInviteCode(PlaceCounselingParam placeParam);

    ResponseEntity<List<TicketBuyableDto>> getBuyableByPlace(PlaceCounselingParam placeParam);

    ResponseEntity<PlaceCounselingDto> updateOrder(@RequestBody PlaceCounselingParam param);

    ResponseEntity<PlaceCounselingDto> updateContract(@RequestBody PlaceCounselingParam param);

    ResponseEntity<PlaceCounselingDto>  signContract(@RequestBody PlaceCounselingParam placeParam);

    ResponseEntity<Boolean> sendContractCode(@RequestBody PlaceContractSmsParam param);

}
