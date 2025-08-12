package com.notrika.gympin.controller.impl.place;

import com.notrika.gympin.common.place.placeGym.dto.PlaceGymDto;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymContractSmsParam;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymParam;
import com.notrika.gympin.common.ticket.buyable.dto.TicketBuyableDto;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import com.notrika.gympin.common.settings.location.param.LocationParam;
import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
import com.notrika.gympin.common.place.placeGym.api.PlaceGymController;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymMultimediaListParam;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymMultimediaParam;
import com.notrika.gympin.common.place.placeGym.query.PlaceGymQuery;
import com.notrika.gympin.common.place.placeGym.service.PlaceGymService;
import com.notrika.gympin.common.sport.sport.dto.SportDto;
import com.notrika.gympin.common.user.user.dto.InviteCode;
import com.notrika.gympin.common.user.user.param.UserParam;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/gym")
public class PlaceGymControllerImpl implements PlaceGymController {

    private final PlaceGymService placeService;


    public PlaceGymControllerImpl(PlaceGymService placeService) {
        this.placeService = placeService;
    }

    @Override
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN','MANAGER')")
    public ResponseEntity<PlaceGymDto> add(PlaceGymParam placeParam) {
        return new ResponseEntity<>(placeService.add(placeParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<PlaceGymDto> update(PlaceGymParam placeParam) {
        return new ResponseEntity<>(placeService.update(placeParam), HttpStatus.OK);
    }

    @Override
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN','MANAGER')")
    public ResponseEntity<PlaceGymDto> delete(PlaceGymParam placeParam) {
        return new ResponseEntity<>(placeService.delete(placeParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<PlaceGymDto>> getAll(BasePagedParam pagingParam) {
        return new ResponseEntity<>(placeService.getAll(pagingParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<PlaceGymDto> getById(Long id) {
        return new ResponseEntity<>(placeService.getById(id), HttpStatus.OK);
    }


    @Override
    public ResponseEntity<Page<PlaceGymDto>> query(PlaceGymQuery filter) {
        return new ResponseEntity<>(placeService.query(filter), HttpStatus.OK);
    }


    @Override
    @GetMapping("/getSportsOfPlace")
    public ResponseEntity<List<SportDto>> getSportsOfPlace(PlaceGymDto place) {
        return ResponseEntity.ok(placeService.getSportsOfPlace(place));
    }

    @Override
    @GetMapping("/getMultimedias")
    public ResponseEntity<List<MultimediaDto>> getMultimedias(PlaceGymParam place) {
        return ResponseEntity.ok(placeService.getMultimedias(place));
    }

    @Override
    @PostMapping("/addMultimedia")
    public ResponseEntity<PlaceGymDto> addMultimedia(PlaceGymMultimediaParam param) {
        return ResponseEntity.ok(placeService.addMultimedia(param));
    }

    @Override
    @PostMapping("/addMultimediaList")
    public ResponseEntity<PlaceGymDto> addMultimediaList(PlaceGymMultimediaListParam param) {
        return ResponseEntity.ok(placeService.addMultimediaList(param));
    }

    @Override
    @PostMapping("/updateOrder")
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN','MANAGER')")
    public ResponseEntity<PlaceGymDto> updateOrder(PlaceGymParam param) {
        return ResponseEntity.ok(placeService.updateOrder(param));
    }

    @Override
    @PutMapping("/deleteMultimedia")
    public ResponseEntity<PlaceGymDto> deleteMultimedia(PlaceGymMultimediaParam param) {
        return ResponseEntity.ok(placeService.removeMultimedia(param));
    }

    @Override
    @PutMapping("/changeStatus")
    public ResponseEntity<PlaceGymDto> changeStatus(PlaceGymParam param) {
        return new ResponseEntity<>(placeService.changeStatus(param), HttpStatus.OK);
    }

    @Override
    @GetMapping("/getPlacesByLocation")
    public ResponseEntity<List<PlaceGymDto>> getPlacesByLocation(LocationParam param) {
        return new ResponseEntity<>(placeService.getPlacesByLocation(param), HttpStatus.OK);
    }

    @Override
    @GetMapping("/getPlacesByUser")
    public ResponseEntity<List<PlaceGymDto>> getPlaceByUser(UserParam userParam) {
        return new ResponseEntity<>(placeService.getPlacesByUser(userParam), HttpStatus.OK);
    }

    @Override
    @GetMapping("/getPlacesInviteCode")
    public ResponseEntity<InviteCode> getPlaceInviteCode(PlaceGymParam placeParam) {
        return new ResponseEntity<>(placeService.getPlaceInviteCode(placeParam), HttpStatus.OK);
    }

    @Override
    @GetMapping("/getBuyableByPlace")
    public ResponseEntity<List<TicketBuyableDto>> getBuyableByPlace(PlaceGymParam placeParam) {
        return new ResponseEntity<>(placeService.getBuyableByPlace(placeParam), HttpStatus.OK);
    }


    @Override
    @PostMapping("/updateContract")
    public ResponseEntity<PlaceGymDto> updateContract(PlaceGymParam param) {
        return ResponseEntity.ok(placeService.updateContract(param));
    }

    @Override
    @PostMapping("/signContract")
    public ResponseEntity<PlaceGymDto> signContract(PlaceGymParam param) {
        return ResponseEntity.ok(placeService.signContract(param));
    }

    @Override
    @PostMapping("/sendContractCode")
    public ResponseEntity<Boolean> sendContractCode(PlaceGymContractSmsParam param) {
        return new ResponseEntity<>(placeService.sendContractCode(param), HttpStatus.OK);
    }


}
