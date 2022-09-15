package com.notrika.gympin.controller.impl.option.place;

import com.notrika.gympin.common.BaseFilter;
import com.notrika.gympin.common.BasePagedParam;
import com.notrika.gympin.common.option.place.api.PlaceOptionController;
import com.notrika.gympin.common.option.place.dto.PlaceOptionDto;
import com.notrika.gympin.common.option.place.param.PlaceOptionParam;
import com.notrika.gympin.common.option.place.service.PlaceOptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/placeOption")
public class PlaceOptionControllerImpl implements PlaceOptionController {

    @Autowired
    private PlaceOptionService placeOptionService;

    @Override
    //    @PostMapping("/addPlaceOption")
    public ResponseEntity<PlaceOptionDto> add(@RequestBody PlaceOptionParam placeOptionParam) {
        return new ResponseEntity<PlaceOptionDto>(placeOptionService.add(placeOptionParam), HttpStatus.OK);
    }

    @Override
    //    @PutMapping("/updatePlaceOption")
    public ResponseEntity<PlaceOptionDto> update(@RequestBody PlaceOptionParam placeOptionParam) {
        return new ResponseEntity<PlaceOptionDto>(placeOptionService.update(placeOptionParam), HttpStatus.OK);
    }

    @Override
    //    @GetMapping("/getAllPlaceOption")
    public ResponseEntity<List<PlaceOptionDto>> getAll(BasePagedParam pagingParam) {
        return new ResponseEntity<List<PlaceOptionDto>>(placeOptionService.getAll(pagingParam), HttpStatus.OK);
    }

    @Override
    //    @GetMapping("/getPlaceOptionById")
    public ResponseEntity<PlaceOptionDto> getById(Long id) {
        return new ResponseEntity<PlaceOptionDto>(placeOptionService.getById(id), HttpStatus.OK);
    }

    @Override
    //    @DeleteMapping("/deletePlaceOption")
    public ResponseEntity<PlaceOptionDto> delete(@RequestBody PlaceOptionParam placeOptionParam) {
        PlaceOptionDto deletedPlaceOption = placeOptionService.delete(placeOptionParam);
        return new ResponseEntity<PlaceOptionDto>(deletedPlaceOption, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Long> countSearch(BaseFilter<?> filter) {
        return null;
    }

    @Override
    public ResponseEntity<List<PlaceOptionDto>> search(BaseFilter<?> filter) {
        return null;
    }

    @Override
    public ResponseEntity<Long> countFilter(BaseFilter<?> filter) {
        return null;
    }

    @Override
    public ResponseEntity<List<PlaceOptionDto>> filter(BaseFilter<?> filter) {
        return null;
    }
}
