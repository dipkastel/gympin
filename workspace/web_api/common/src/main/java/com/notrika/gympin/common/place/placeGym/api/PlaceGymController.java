package com.notrika.gympin.common.place.placeGym.api;

import com.notrika.gympin.common.place.placeGym.dto.PlaceGymDto;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymContractSmsParam;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymParam;
import com.notrika.gympin.common.ticket.buyable.dto.TicketBuyableDto;
import com.notrika.gympin.common.util._base.base.BaseController;
import com.notrika.gympin.common.settings.location.param.LocationParam;
import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymMultimediaListParam;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymMultimediaParam;
import com.notrika.gympin.common.place.placeGym.query.PlaceGymQuery;
import com.notrika.gympin.common.sport.sport.dto.SportDto;
import com.notrika.gympin.common.user.user.dto.InviteCode;
import com.notrika.gympin.common.user.user.param.UserParam;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface PlaceGymController extends BaseController<PlaceGymParam, PlaceGymDto, PlaceGymQuery> {

    ResponseEntity<PlaceGymDto> changeStatus(@RequestBody PlaceGymParam place);

    ResponseEntity<List<PlaceGymDto>> getPlacesByLocation(LocationParam regionParam);

    ResponseEntity<List<PlaceGymDto>> getPlaceByUser(UserParam userParam);

    ResponseEntity<List<SportDto>> getSportsOfPlace(PlaceGymDto place);

    ResponseEntity<List<MultimediaDto>> getMultimedias(PlaceGymParam place);

    ResponseEntity<PlaceGymDto> addMultimedia(@RequestBody PlaceGymMultimediaParam place);

    ResponseEntity<PlaceGymDto> addMultimediaList(@RequestBody PlaceGymMultimediaListParam place);

    ResponseEntity<PlaceGymDto> deleteMultimedia(@RequestBody PlaceGymMultimediaParam place);

    ResponseEntity<InviteCode> getPlaceInviteCode(PlaceGymParam placeParam);

    ResponseEntity<List<TicketBuyableDto>> getBuyableByPlace(PlaceGymParam placeParam);

    ResponseEntity<PlaceGymDto> updateOrder(@RequestBody PlaceGymParam param);

    ResponseEntity<PlaceGymDto> updateContract(@RequestBody PlaceGymParam param);

    ResponseEntity<PlaceGymDto>  signContract(@RequestBody PlaceGymParam placeParam);

    ResponseEntity<Boolean> sendContractCode(@RequestBody PlaceGymContractSmsParam param);

}
