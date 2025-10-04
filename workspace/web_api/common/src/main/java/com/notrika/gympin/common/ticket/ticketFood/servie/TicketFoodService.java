package com.notrika.gympin.common.ticket.ticketFood.servie;

import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
import com.notrika.gympin.common.place.placeGym.dto.PlaceGymDto;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymMultimediaListParam;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymMultimediaParam;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymParam;
import com.notrika.gympin.common.ticket.ticketFood.dto.TicketFoodDto;
import com.notrika.gympin.common.ticket.ticketFood.param.TicketFoodMultimediaParam;
import com.notrika.gympin.common.ticket.ticketFood.param.TicketFoodParam;
import com.notrika.gympin.common.ticket.ticketFood.query.TicketFoodQuery;
import com.notrika.gympin.common.util._base.base.BaseService;

import java.util.List;

public interface TicketFoodService extends BaseService<TicketFoodParam, TicketFoodDto, TicketFoodQuery> {

    List<MultimediaDto> getMultimedias(TicketFoodParam param);
    TicketFoodDto addMultimedia(TicketFoodMultimediaParam param);
    TicketFoodDto removeMultimedia(TicketFoodMultimediaParam param);
    TicketFoodDto setDefaultMultimedia(TicketFoodMultimediaParam param);
}
