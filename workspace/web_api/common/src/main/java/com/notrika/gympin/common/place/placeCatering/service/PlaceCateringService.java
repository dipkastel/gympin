package com.notrika.gympin.common.place.placeCatering.service;

import com.notrika.gympin.common.place.placeCatering.dto.PlaceCateringDto;
import com.notrika.gympin.common.place.placeCatering.param.PlaceCateringParam;
import com.notrika.gympin.common.place.placeCatering.query.PlaceCateringQuery;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymParam;
import com.notrika.gympin.common.ticket.buyable.dto.TicketBuyableDto;
import com.notrika.gympin.common.util._base.base.BaseService;

import java.util.List;

public interface PlaceCateringService extends BaseService<PlaceCateringParam, PlaceCateringDto, PlaceCateringQuery> {

    PlaceCateringDto changeStatus(PlaceCateringParam param);

    List<TicketBuyableDto> getBuyableByPlace(PlaceGymParam param);

}
