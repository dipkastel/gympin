package com.notrika.gympin.controller.impl.location;

import com.notrika.gympin.common.BasePagedParam;
import com.notrika.gympin.common.location.api.PlaceController;
import com.notrika.gympin.common.location.dto.PlaceDto;
import com.notrika.gympin.common.location.dto.PlaceOwnerDto;
import com.notrika.gympin.common.location.param.PlaceOwnerParam;
import com.notrika.gympin.common.location.param.PlaceParam;
import com.notrika.gympin.common.location.param.RegionParam;
import com.notrika.gympin.common.location.service.LocationService;
import com.notrika.gympin.common.location.service.PlaceService;
import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.param.UserParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/place")
public class PlaceControllerImpl implements PlaceController {

    private final PlaceService placeService;

    @Autowired
    private LocationService locationService;

    public PlaceControllerImpl(PlaceService placeService) {
        this.placeService = placeService;
    }

    @Override
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN','MANAGER')")
    public ResponseEntity<PlaceDto> add(@RequestBody PlaceParam placeParam) {
        return new ResponseEntity<PlaceDto>(placeService.add(placeParam), HttpStatus.OK);
    }

    @Override
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN','MANAGER')")
    public ResponseEntity<PlaceDto> update(@RequestBody PlaceParam placeParam) {
        return new ResponseEntity<PlaceDto>(placeService.update(placeParam), HttpStatus.OK);
    }

    @Override
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN','MANAGER')")
    public ResponseEntity<PlaceDto> delete(@RequestBody PlaceParam placeParam) {
        return new ResponseEntity<PlaceDto>(placeService.delete(placeParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<PlaceDto>> getAll(BasePagedParam pagingParam) {
        return new ResponseEntity<List<PlaceDto>>(placeService.getAll(pagingParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<PlaceDto> getById(long id) {
        return new ResponseEntity<PlaceDto>(placeService.getById(id), HttpStatus.OK);
    }

    @Override
    @GetMapping("/getplacesbyregion")
    public ResponseEntity<List<PlaceDto>> getPlacesByRegion(RegionParam regionParam) {
        return new ResponseEntity<List<PlaceDto>>(placeService.getPlacesByRegion(regionParam), HttpStatus.OK);
    }

    @Override
    @GetMapping("/getplacebyuser")
    public ResponseEntity<List<PlaceDto>> getPlaceByUser(UserParam userParam) {
        return new ResponseEntity<List<PlaceDto>>(locationService.getPlaceByUser(userParam), HttpStatus.OK);
    }

    @Override
    @PostMapping("/addplaceowner")
    public ResponseEntity<PlaceOwnerDto> addPlaceOwner(@RequestBody PlaceOwnerParam placeOwnerParam) {
        return new ResponseEntity<PlaceOwnerDto>(locationService.addPlaceOwner(placeOwnerParam), HttpStatus.OK);
    }

    @Override
    @GetMapping("/getownersplace")
    public ResponseEntity<List<UserDto>> getOwnersPlace(PlaceParam placeParam) {
        return new ResponseEntity<List<UserDto>>(locationService.getOwnersPlace(placeParam), HttpStatus.OK);
    }

    @Override
    @DeleteMapping("/deleteplaceowner")
    public ResponseEntity<PlaceOwnerDto> deletePlaceOwner(@RequestBody PlaceOwnerParam placeOwnerParam) {
        PlaceOwnerDto deletedPlaceOwner = locationService.deletePlaceOwner(placeOwnerParam);
        return new ResponseEntity<PlaceOwnerDto>(deletedPlaceOwner, HttpStatus.OK);
    }

}
