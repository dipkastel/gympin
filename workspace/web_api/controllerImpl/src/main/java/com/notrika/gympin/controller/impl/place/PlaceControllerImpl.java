package com.notrika.gympin.controller.impl.place;

import com.notrika.gympin.common.place.placeBase.api.PlaceController;
import com.notrika.gympin.common.place.placeBase.dto.PlaceDto;
import com.notrika.gympin.common.place.placeBase.param.PlaceParam;
import com.notrika.gympin.common.place.placeBase.query.PlaceQuery;
import com.notrika.gympin.common.place.placeBase.service.PlaceService;
import com.notrika.gympin.common.settings.location.param.LocationParam;
import com.notrika.gympin.common.ticket.buyable.dto.TicketBuyableDto;
import com.notrika.gympin.common.user.user.dto.InviteCode;
import com.notrika.gympin.common.user.user.param.UserParam;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/place")
public class PlaceControllerImpl implements PlaceController {

    @Autowired
    public PlaceService placeService;

    @Override
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN','MANAGER')")
    public ResponseEntity<PlaceDto> add(PlaceParam placeParam) {
        return new ResponseEntity<>(placeService.add(placeParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<PlaceDto> update(PlaceParam placeParam) {
        return new ResponseEntity<>(placeService.update(placeParam), HttpStatus.OK);
    }

    @Override
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN','MANAGER')")
    public ResponseEntity<PlaceDto> delete(PlaceParam placeParam) {
        return new ResponseEntity<>(placeService.delete(placeParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<PlaceDto>> getAll(BasePagedParam pagingParam) {
        return new ResponseEntity<>(placeService.getAll(pagingParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<PlaceDto> getById(Long id) {
        return new ResponseEntity<>(placeService.getById(id), HttpStatus.OK);
    }


    @Override
    public ResponseEntity<Page<PlaceDto>> query(PlaceQuery filter) {
        return new ResponseEntity<>(placeService.query(filter), HttpStatus.OK);
    }
    @Override
    @GetMapping("/getPlacesByLocation")
    public ResponseEntity<List<PlaceDto>> getPlacesByLocation(LocationParam param) {
        return new ResponseEntity<>(placeService.getPlacesByLocation(param), HttpStatus.OK);
    }

    @Override
    @GetMapping("/getPlacesByUser")
    public ResponseEntity<List<PlaceDto>> getPlaceByUser(UserParam userParam) {
        return new ResponseEntity<>(placeService.getPlacesByUser(userParam), HttpStatus.OK);
    }

    @Override
    @GetMapping("/getPlacesInviteCode")
    public ResponseEntity<InviteCode> getPlaceInviteCode(PlaceParam placeParam) {
        return new ResponseEntity<>(placeService.getPlaceInviteCode(placeParam), HttpStatus.OK);
    }

    @Override
    @GetMapping("/getBuyableByPlace")
    public ResponseEntity<List<TicketBuyableDto>> getBuyableByPlace(PlaceParam placeParam) {
        return new ResponseEntity<>(placeService.getBuyableByPlace(placeParam), HttpStatus.OK);
    }


}
