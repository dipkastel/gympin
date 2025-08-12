package com.notrika.gympin.common.place.placeCatering.api;

import com.notrika.gympin.common.place.placeBase.dto.PlaceDto;
import com.notrika.gympin.common.place.placeBase.param.PlaceParam;
import com.notrika.gympin.common.place.placeCatering.dto.PlaceCateringDto;
import com.notrika.gympin.common.place.placeCatering.param.PlaceCateringParam;
import com.notrika.gympin.common.place.placeCatering.query.PlaceCateringQuery;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymParam;
import com.notrika.gympin.common.ticket.buyable.dto.TicketBuyableDto;
import com.notrika.gympin.common.util._base.base.BaseController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface PlaceCateringController extends BaseController<PlaceCateringParam, PlaceCateringDto, PlaceCateringQuery> {

    ResponseEntity<PlaceCateringDto> changeStatus(@RequestBody PlaceCateringParam place);

    ResponseEntity<List<TicketBuyableDto>> getBuyableByPlace(PlaceGymParam placeParam);

}
