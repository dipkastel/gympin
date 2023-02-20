package com.notrika.gympin.controller.impl.place;

import com.notrika.gympin.common._base.param.BasePagedParam;
import com.notrika.gympin.common.location.param.LocationParam;
import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
import com.notrika.gympin.common.place.place.api.PlaceController;
import com.notrika.gympin.common.place.place.dto.PlaceDto;
import com.notrika.gympin.common.place.place.param.PlaceMultimediaParam;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.place.place.query.PlaceQuery;
import com.notrika.gympin.common.place.place.service.PlaceService;
import com.notrika.gympin.common.sport.dto.SportDto;
import com.notrika.gympin.common.user.param.UserParam;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/place")
public class PlaceControllerImpl implements PlaceController {

    private final PlaceService placeService;


    public PlaceControllerImpl(PlaceService placeService) {
        this.placeService = placeService;
    }

    @Override
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN','MANAGER')")
    public ResponseEntity<PlaceDto> add(@RequestBody PlaceParam placeParam) {
        return new ResponseEntity<>(placeService.add(placeParam), HttpStatus.OK);
    }

    @Override
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN','MANAGER')")
    public ResponseEntity<PlaceDto> update(@RequestBody PlaceParam placeParam) {
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
    @GetMapping("/get-sports-of-place")
    public ResponseEntity<List<SportDto>> getSportsOfPlace(PlaceDto place) {
        return ResponseEntity.ok(placeService.getSportsOfPlace(place));
    }

    @Override
    @GetMapping("/getMultimedias")
    public ResponseEntity<List<MultimediaDto>> getMultimedias(PlaceParam place) {
        return ResponseEntity.ok(placeService.getMultimedias(place));
    }

    @Override
    @PostMapping("/addMultimedia")
    public ResponseEntity<PlaceDto> addMultimedia(PlaceMultimediaParam param) {
        return ResponseEntity.ok(placeService.addMultimedia(param));
    }

    @Override
    @PutMapping("/deleteMultimedia")
    public ResponseEntity<PlaceDto> deleteMultimedia(PlaceMultimediaParam param) {
        return ResponseEntity.ok(placeService.removeMultimedia(param));
    }

    @Override
    @PutMapping("/changeStatus")
    public ResponseEntity<PlaceDto> changeStatus(PlaceParam param) {
        return new ResponseEntity<>(placeService.changeStatus(param), HttpStatus.OK);
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


}