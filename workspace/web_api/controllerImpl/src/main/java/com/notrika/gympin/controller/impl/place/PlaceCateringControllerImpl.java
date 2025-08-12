package com.notrika.gympin.controller.impl.place;

import com.notrika.gympin.common.place.placeBase.dto.PlaceDto;
import com.notrika.gympin.common.place.placeBase.param.PlaceParam;
import com.notrika.gympin.common.place.placeCatering.api.PlaceCateringController;
import com.notrika.gympin.common.place.placeCatering.dto.PlaceCateringDto;
import com.notrika.gympin.common.place.placeCatering.param.PlaceCateringParam;
import com.notrika.gympin.common.place.placeCatering.query.PlaceCateringQuery;
import com.notrika.gympin.common.place.placeCatering.service.PlaceCateringService;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymParam;
import com.notrika.gympin.common.ticket.buyable.dto.TicketBuyableDto;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/catering")
public class PlaceCateringControllerImpl implements PlaceCateringController {

    private final PlaceCateringService placeCateringService;


    public PlaceCateringControllerImpl(PlaceCateringService placeService) {
        this.placeCateringService = placeService;
    }

    @Override
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN','MANAGER')")
    public ResponseEntity<PlaceCateringDto> add(PlaceCateringParam placeParam) {
        return new ResponseEntity<>(placeCateringService.add(placeParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<PlaceCateringDto> update(PlaceCateringParam placeParam) {
        return new ResponseEntity<>(placeCateringService.update(placeParam), HttpStatus.OK);
    }

    @Override
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN','MANAGER')")
    public ResponseEntity<PlaceCateringDto> delete(PlaceCateringParam placeParam) {
        return new ResponseEntity<>(placeCateringService.delete(placeParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<PlaceCateringDto>> getAll(BasePagedParam pagingParam) {
        return new ResponseEntity<>(placeCateringService.getAll(pagingParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<PlaceCateringDto> getById(Long id) {
        return new ResponseEntity<>(placeCateringService.getById(id), HttpStatus.OK);
    }


    @Override
    public ResponseEntity<Page<PlaceCateringDto>> query(PlaceCateringQuery filter) {
        return new ResponseEntity<>(placeCateringService.query(filter), HttpStatus.OK);
    }


    @Override
    @PutMapping("/changeStatus")
    public ResponseEntity<PlaceCateringDto> changeStatus(PlaceCateringParam param) {
        return new ResponseEntity<>(placeCateringService.changeStatus(param), HttpStatus.OK);
    }

    @Override
    @GetMapping("/getBuyableByPlace")
    public ResponseEntity<List<TicketBuyableDto>> getBuyableByPlace(PlaceGymParam placeParam) {
        return new ResponseEntity<>(placeCateringService.getBuyableByPlace(placeParam), HttpStatus.OK);
    }

}
