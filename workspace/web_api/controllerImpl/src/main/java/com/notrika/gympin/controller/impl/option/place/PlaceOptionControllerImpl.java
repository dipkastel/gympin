package com.notrika.gympin.controller.impl.option.place;

import com.notrika.gympin.common.BaseDto;
import com.notrika.gympin.common.option.place.api.PlaceOptionController;
import com.notrika.gympin.common.option.place.dto.PlaceOptionDto;
import com.notrika.gympin.common.option.place.param.PlaceOptionParam;
import com.notrika.gympin.common.option.place.service.PlaceOptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/placeOption")
public class PlaceOptionControllerImpl implements PlaceOptionController {

    @Autowired
    private PlaceOptionService placeOptionService;

    @Override
    @PostMapping("/addPlaceOption")
    public ResponseEntity<PlaceOptionDto> addPlaceOption(@RequestBody PlaceOptionParam placeOptionParam) {
        return new ResponseEntity<PlaceOptionDto>(placeOptionService.addPlaceOption(placeOptionParam), HttpStatus.OK);
    }

    @Override
    @PutMapping("/updatePLaceOption")
    public ResponseEntity<PlaceOptionDto> updatePLaceOption(@RequestBody PlaceOptionParam placeOptionParam) {
        return new ResponseEntity<PlaceOptionDto>(placeOptionService.updatePLaceOption(placeOptionParam),HttpStatus.OK);
    }

    @Override
    @GetMapping("/getAllPlaceOption")
    public ResponseEntity<List<PlaceOptionDto>> getAllPlaceOption() {
        return new ResponseEntity<List<PlaceOptionDto>>(placeOptionService.getAllPlaceOptionDto(),HttpStatus.OK);
    }

    @Override
    @GetMapping("/getPlaceOptionById")
    public ResponseEntity<PlaceOptionDto> getPlaceOptionById(long id) {
        return new ResponseEntity<PlaceOptionDto>(placeOptionService.getPlaceOptionDtoById(id),HttpStatus.OK);
    }

    @Override
    @DeleteMapping("/deletePlaceOption")
    public ResponseEntity<PlaceOptionDto> deletePlaceOption(@RequestBody PlaceOptionParam placeOptionParam) {
        PlaceOptionDto deletedPlaceOption = placeOptionService.deletePlaceOption(placeOptionParam);
        return new ResponseEntity<PlaceOptionDto>(deletedPlaceOption,HttpStatus.OK);
    }
}
