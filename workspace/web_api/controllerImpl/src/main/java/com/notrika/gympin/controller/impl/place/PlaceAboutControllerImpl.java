package com.notrika.gympin.controller.impl.place;

import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import com.notrika.gympin.common.place.about.api.PlaceAboutController;
import com.notrika.gympin.common.place.about.dto.PlaceAboutDto;
import com.notrika.gympin.common.place.about.param.PlaceAboutParam;
import com.notrika.gympin.common.place.about.service.PlaceAboutService;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.util.exception.general.FunctionNotAvalable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/placeAbout")
public class PlaceAboutControllerImpl implements PlaceAboutController {

    @Autowired
    private PlaceAboutService placeAboutService;

    @Override
    public ResponseEntity<PlaceAboutDto> add( PlaceAboutParam placeAboutParam) {
        return new ResponseEntity<PlaceAboutDto>(placeAboutService.add(placeAboutParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<PlaceAboutDto> update( PlaceAboutParam placeAboutParam) {
        return new ResponseEntity<PlaceAboutDto>(placeAboutService.update(placeAboutParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<PlaceAboutDto>> getAll(BasePagedParam pagingParam) {
        return new ResponseEntity<List<PlaceAboutDto>>(placeAboutService.getAll(pagingParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<PlaceAboutDto> getById(Long id) {
        return new ResponseEntity<PlaceAboutDto>(placeAboutService.getById(id), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<PlaceAboutDto> delete(PlaceAboutParam placeAboutParam) {
        PlaceAboutDto placeAboutDto = placeAboutService.delete(placeAboutParam);
        return new ResponseEntity<PlaceAboutDto>(placeAboutDto, HttpStatus.OK);
    }


    @Override
    public ResponseEntity<Page<PlaceAboutDto>> query(BaseQuery<?> filter) {
        throw new FunctionNotAvalable();
    }

    @Override
    @GetMapping("getByPlaceId")
    public ResponseEntity<List<PlaceAboutDto>> getAboutByPlace(PlaceParam placeParam) {
        return new ResponseEntity<List<PlaceAboutDto>>(placeAboutService.getByPlaceId(placeParam.getId()),HttpStatus.OK);
    }

    @Override
    @PostMapping("getAllAboutByPlaces")
    public ResponseEntity<List<PlaceAboutDto>> getAllAboutByPlaces(@RequestBody List<PlaceParam> placeParam) {
        return new ResponseEntity<List<PlaceAboutDto>>(placeAboutService.getAllAboutByPlaces(placeParam),HttpStatus.OK);
    }
}
