package com.notrika.gympin.controller.impl.ticket.ticketFood;

import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
import com.notrika.gympin.common.place.placeCatering.param.PlaceCateringParam;
import com.notrika.gympin.common.place.placeGym.dto.PlaceGymDto;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymMultimediaParam;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymParam;
import com.notrika.gympin.common.ticket.ticketFood.api.TicketFoodController;
import com.notrika.gympin.common.ticket.ticketFood.dto.TicketFoodDto;
import com.notrika.gympin.common.ticket.ticketFood.param.TicketFoodCategoryParam;
import com.notrika.gympin.common.ticket.ticketFood.param.TicketFoodMultimediaParam;
import com.notrika.gympin.common.ticket.ticketFood.param.TicketFoodParam;
import com.notrika.gympin.common.ticket.ticketFood.query.TicketFoodQuery;
import com.notrika.gympin.common.ticket.ticketFood.servie.TicketFoodService;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/TicketFood")
public class TicketFoodControllerImpl implements TicketFoodController {

    @Autowired
    private TicketFoodService ticketFoodService;

    @Override
    public ResponseEntity<TicketFoodDto> add(TicketFoodParam param) {
        return ResponseEntity.ok(ticketFoodService.add(param));
    }

    @Override
    public ResponseEntity<TicketFoodDto> update(TicketFoodParam param) {
        return ResponseEntity.ok(ticketFoodService.update(param));
    }

    @Override
    public ResponseEntity<TicketFoodDto> delete(TicketFoodParam param) {
        return ResponseEntity.ok(ticketFoodService.delete(param));
    }

    @Override
    public ResponseEntity<List<TicketFoodDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(ticketFoodService.getAll(pagingParam));
    }

    @Override
    public ResponseEntity<TicketFoodDto> getById(Long id) {
        return ResponseEntity.ok(ticketFoodService.getById(id));
    }

    @Override
    public ResponseEntity<Page<TicketFoodDto>> query(TicketFoodQuery filter) {
        return ResponseEntity.ok(ticketFoodService.query(filter));
    }


    @Override
    @GetMapping("/getMultimedias")
    public ResponseEntity<List<MultimediaDto>> getMultimedias(TicketFoodParam param) {
        return ResponseEntity.ok(ticketFoodService.getMultimedias(param));
    }

    @Override
    @PostMapping("/addMultimedia")
    public ResponseEntity<TicketFoodDto> addMultimedia(TicketFoodMultimediaParam param) {
        return ResponseEntity.ok(ticketFoodService.addMultimedia(param));
    }

    @Override
    @PostMapping("/setDefaultMultimedia")
    public ResponseEntity<TicketFoodDto> setDefaultMultimedia(TicketFoodMultimediaParam param) {
        return ResponseEntity.ok(ticketFoodService.setDefaultMultimedia(param));
    }

    @Override
    @PutMapping("/deleteMultimedia")
    public ResponseEntity<TicketFoodDto> deleteMultimedia(TicketFoodMultimediaParam param) {
        return ResponseEntity.ok(ticketFoodService.removeMultimedia(param));
    }

    @Override
    @GetMapping("/GetAllCategoriesByCatering")
    public ResponseEntity<List<String>> GetAllCategories(PlaceCateringParam param) {
        return ResponseEntity.ok(ticketFoodService.GetAllCategoriesByCatering(param));
    }

    @Override
    @PostMapping("/ClearCategory")
    public ResponseEntity<TicketFoodDto> ClearCategory(TicketFoodCategoryParam param) {
        return ResponseEntity.ok(ticketFoodService.ClearCategory(param));
    }

    @Override
    @PostMapping("/SetCategory")
    public ResponseEntity<TicketFoodDto> SetCategory(TicketFoodCategoryParam param) {
        return ResponseEntity.ok(ticketFoodService.SetCategory(param));
    }


}
