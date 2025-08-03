package com.notrika.gympin.controller.impl.place;

import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
import com.notrika.gympin.common.place.placeCatering.api.PlaceCateringController;
import com.notrika.gympin.common.place.placeCatering.dto.PlaceCateringDto;
import com.notrika.gympin.common.place.placeCatering.param.PlaceCateringParam;
import com.notrika.gympin.common.place.placeCatering.query.PlaceCateringQuery;
import com.notrika.gympin.common.place.placeCatering.service.PlaceCateringService;
import com.notrika.gympin.common.place.placeGym.api.PlaceGymController;
import com.notrika.gympin.common.place.placeGym.dto.PlaceGymDto;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymContractSmsParam;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymMultimediaListParam;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymMultimediaParam;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymParam;
import com.notrika.gympin.common.place.placeGym.query.PlaceGymQuery;
import com.notrika.gympin.common.place.placeGym.service.PlaceGymService;
import com.notrika.gympin.common.settings.location.param.LocationParam;
import com.notrika.gympin.common.sport.sport.dto.SportDto;
import com.notrika.gympin.common.ticket.buyable.dto.TicketBuyableDto;
import com.notrika.gympin.common.user.user.dto.InviteCode;
import com.notrika.gympin.common.user.user.param.UserParam;
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

    private final PlaceCateringService placeService;


    public PlaceCateringControllerImpl(PlaceCateringService placeService) {
        this.placeService = placeService;
    }

    @Override
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN','MANAGER')")
    public ResponseEntity<PlaceCateringDto> add(PlaceCateringParam placeParam) {
        return new ResponseEntity<>(placeService.add(placeParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<PlaceCateringDto> update(PlaceCateringParam placeParam) {
        return new ResponseEntity<>(placeService.update(placeParam), HttpStatus.OK);
    }

    @Override
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN','MANAGER')")
    public ResponseEntity<PlaceCateringDto> delete(PlaceCateringParam placeParam) {
        return new ResponseEntity<>(placeService.delete(placeParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<PlaceCateringDto>> getAll(BasePagedParam pagingParam) {
        return new ResponseEntity<>(placeService.getAll(pagingParam), HttpStatus.OK);
    }

    @Override
    @GetMapping("/getBuyableByPlace")
    public ResponseEntity<List<TicketBuyableDto>> getBuyableByPlace(PlaceGymParam placeParam) {
        return new ResponseEntity<>(placeService.getBuyableByPlace(placeParam), HttpStatus.OK);
    }



    @Override
    public ResponseEntity<PlaceCateringDto> getById(Long id) {
        return new ResponseEntity<>(placeService.getById(id), HttpStatus.OK);
    }


    @Override
    public ResponseEntity<Page<PlaceCateringDto>> query(PlaceCateringQuery filter) {
        return new ResponseEntity<>(placeService.query(filter), HttpStatus.OK);
    }



}
