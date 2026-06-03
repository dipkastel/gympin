package com.notrika.gympin.controller.impl.place;

import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
import com.notrika.gympin.common.place.placeBase.param.PlaceContractSmsParam;
import com.notrika.gympin.common.place.placeBase.param.PlaceMultimediaListParam;
import com.notrika.gympin.common.place.placeBase.param.PlaceMultimediaParam;
import com.notrika.gympin.common.place.placeCounseling.api.PlaceCounselingController;
import com.notrika.gympin.common.place.placeCounseling.dto.PlaceCounselingDto;
import com.notrika.gympin.common.place.placeCounseling.param.PlaceCounselingParam;
import com.notrika.gympin.common.place.placeCounseling.query.PlaceCounselingQuery;
import com.notrika.gympin.common.place.placeCounseling.service.PlaceCounselingService;
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
@RequestMapping("/api/v1/counseling")
public class PlaceCounselingControllerImpl implements PlaceCounselingController {

    @Autowired
    PlaceCounselingService placeService;


    @Override
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN','MANAGER')")
    public ResponseEntity<PlaceCounselingDto> add(PlaceCounselingParam placeParam) {
        return new ResponseEntity<>(placeService.add(placeParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<PlaceCounselingDto> update(PlaceCounselingParam placeParam) {
        return new ResponseEntity<>(placeService.update(placeParam), HttpStatus.OK);
    }

    @Override
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN','MANAGER')")
    public ResponseEntity<PlaceCounselingDto> delete(PlaceCounselingParam placeParam) {
        return new ResponseEntity<>(placeService.delete(placeParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<PlaceCounselingDto>> getAll(BasePagedParam pagingParam) {
        return new ResponseEntity<>(placeService.getAll(pagingParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<PlaceCounselingDto> getById(Long id) {
        return new ResponseEntity<>(placeService.getById(id), HttpStatus.OK);
    }


    @Override
    public ResponseEntity<Page<PlaceCounselingDto>> query(PlaceCounselingQuery filter) {
        return new ResponseEntity<>(placeService.query(filter), HttpStatus.OK);
    }

    @Override
    @GetMapping("/getMultimedias")
    public ResponseEntity<List<MultimediaDto>> getMultimedias(PlaceCounselingParam place) {
        return ResponseEntity.ok(placeService.getMultimedias(place));
    }

    @Override
    @GetMapping("/getMyPlaceCounselingById")
    public ResponseEntity<PlaceCounselingDto> getMyPlaceCounselingById(Long id) {
        return new ResponseEntity<>(placeService.getById(id), HttpStatus.OK);
    }

    @Override
    @PostMapping("/addMultimedia")
    public ResponseEntity<PlaceCounselingDto> addMultimedia(PlaceMultimediaParam param) {
        return ResponseEntity.ok(placeService.addMultimedia(param));
    }

    @Override
    @PostMapping("/setDefaultMultimedia")
    public ResponseEntity<PlaceCounselingDto> setDefaultMultimedia(PlaceMultimediaParam param) {
        return ResponseEntity.ok(placeService.setDefaultMultimedia(param));
    }

    @Override
    @PutMapping("/deleteMultimedia")
    public ResponseEntity<PlaceCounselingDto> deleteMultimedia(PlaceMultimediaParam param) {
        return ResponseEntity.ok(placeService.removeMultimedia(param));
    }


    @Override
    @PostMapping("/addMultimediaList")
    public ResponseEntity<PlaceCounselingDto> addMultimediaList(PlaceMultimediaListParam param) {
        return ResponseEntity.ok(placeService.addMultimediaList(param));
    }

    @Override
    @PostMapping("/updateOrder")
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN','MANAGER')")
    public ResponseEntity<PlaceCounselingDto> updateOrder(PlaceCounselingParam param) {
        return ResponseEntity.ok(placeService.updateOrder(param));
    }

    @Override
    @PutMapping("/changeStatus")
    public ResponseEntity<PlaceCounselingDto> changeStatus(PlaceCounselingParam param) {
        return new ResponseEntity<>(placeService.changeStatus(param), HttpStatus.OK);
    }

    @Override
    @GetMapping("/getPlacesByLocation")
    public ResponseEntity<List<PlaceCounselingDto>> getPlacesByLocation(LocationParam param) {
        return new ResponseEntity<>(placeService.getPlacesByLocation(param), HttpStatus.OK);
    }

    @Override
    @GetMapping("/getPlacesByUser")
    public ResponseEntity<List<PlaceCounselingDto>> getPlaceByUser(UserParam userParam) {
        return new ResponseEntity<>(placeService.getPlacesByUser(userParam), HttpStatus.OK);
    }

    @Override
    @GetMapping("/getPlacesInviteCode")
    public ResponseEntity<InviteCode> getPlaceInviteCode(PlaceCounselingParam placeParam) {
        return new ResponseEntity<>(placeService.getPlaceInviteCode(placeParam), HttpStatus.OK);
    }

    @Override
    @GetMapping("/getBuyableByPlace")
    public ResponseEntity<List<TicketBuyableDto>> getBuyableByPlace(PlaceCounselingParam placeParam) {
        return new ResponseEntity<>(placeService.getBuyableByPlace(placeParam), HttpStatus.OK);
    }


    @Override
    @PostMapping("/updateContract")
    public ResponseEntity<PlaceCounselingDto> updateContract(PlaceCounselingParam param) {
        return ResponseEntity.ok(placeService.updateContract(param));
    }

    @Override
    @PostMapping("/signContract")
    public ResponseEntity<PlaceCounselingDto> signContract(PlaceCounselingParam param) {
        return ResponseEntity.ok(placeService.signContract(param));
    }

    @Override
    @PostMapping("/sendContractCode")
    public ResponseEntity<Boolean> sendContractCode(PlaceContractSmsParam param) {
        return new ResponseEntity<>(placeService.sendContractCode(param), HttpStatus.OK);
    }


}
