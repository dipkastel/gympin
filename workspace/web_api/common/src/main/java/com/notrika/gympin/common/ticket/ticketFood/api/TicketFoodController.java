package com.notrika.gympin.common.ticket.ticketFood.api;

import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
import com.notrika.gympin.common.place.placeCatering.param.PlaceCateringParam;
import com.notrika.gympin.common.place.placeGym.dto.PlaceGymDto;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymMultimediaListParam;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymMultimediaParam;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymParam;
import com.notrika.gympin.common.ticket.ticketFood.dto.TicketFoodDto;
import com.notrika.gympin.common.ticket.ticketFood.param.TicketFoodCategoryParam;
import com.notrika.gympin.common.ticket.ticketFood.param.TicketFoodMultimediaParam;
import com.notrika.gympin.common.ticket.ticketFood.param.TicketFoodParam;
import com.notrika.gympin.common.ticket.ticketFood.query.TicketFoodQuery;
import com.notrika.gympin.common.util._base.base.BaseController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface TicketFoodController extends BaseController<TicketFoodParam, TicketFoodDto, TicketFoodQuery> {

    ResponseEntity<List<MultimediaDto>> getMultimedias(TicketFoodParam param);

    ResponseEntity<TicketFoodDto> addMultimedia(@RequestBody TicketFoodMultimediaParam param);

    ResponseEntity<TicketFoodDto> setDefaultMultimedia(@RequestBody TicketFoodMultimediaParam param);

    ResponseEntity<TicketFoodDto> deleteMultimedia(@RequestBody TicketFoodMultimediaParam param);

    ResponseEntity<List<String>> GetAllCategories(PlaceCateringParam param);

    ResponseEntity<TicketFoodDto> ClearCategory(@RequestBody TicketFoodCategoryParam param);

    ResponseEntity<TicketFoodDto> SetCategory(@RequestBody TicketFoodCategoryParam param);



}
