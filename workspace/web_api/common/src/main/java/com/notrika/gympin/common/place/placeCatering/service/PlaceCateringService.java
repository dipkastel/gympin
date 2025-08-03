package com.notrika.gympin.common.place.placeCatering.service;

import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
import com.notrika.gympin.common.place.placeCatering.dto.PlaceCateringDto;
import com.notrika.gympin.common.place.placeCatering.param.PlaceCateringParam;
import com.notrika.gympin.common.place.placeCatering.query.PlaceCateringQuery;
import com.notrika.gympin.common.place.placeGym.dto.PlaceGymDto;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymContractSmsParam;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymMultimediaListParam;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymMultimediaParam;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymParam;
import com.notrika.gympin.common.place.placeGym.query.PlaceGymQuery;
import com.notrika.gympin.common.settings.location.param.LocationParam;
import com.notrika.gympin.common.sport.sport.dto.SportDto;
import com.notrika.gympin.common.ticket.buyable.dto.TicketBuyableDto;
import com.notrika.gympin.common.user.user.dto.InviteCode;
import com.notrika.gympin.common.user.user.param.UserParam;
import com.notrika.gympin.common.util._base.base.BaseService;

import java.util.List;

public interface PlaceCateringService extends BaseService<PlaceCateringParam, PlaceCateringDto, PlaceCateringQuery> {

    List<TicketBuyableDto> getBuyableByPlace(PlaceGymParam param);

}
