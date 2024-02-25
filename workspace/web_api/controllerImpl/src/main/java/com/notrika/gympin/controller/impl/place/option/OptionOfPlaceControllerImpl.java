package com.notrika.gympin.controller.impl.place.option;

import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import com.notrika.gympin.common.place.option.api.OptionOfPlaceController;
import com.notrika.gympin.common.place.option.dto.OptionOfPlaceDto;
import com.notrika.gympin.common.place.option.param.OptionOfPlaceParam;
import com.notrika.gympin.common.place.option.service.OptionOfPlaceService;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/OptionOfPlace")
public class OptionOfPlaceControllerImpl implements OptionOfPlaceController {

    @Autowired
    private OptionOfPlaceService optionOfPlaceService;

    @Override
    public ResponseEntity<OptionOfPlaceDto> add( OptionOfPlaceParam placeOptionParam) {
        return new ResponseEntity<OptionOfPlaceDto>(optionOfPlaceService.add(placeOptionParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<OptionOfPlaceDto> update( OptionOfPlaceParam placeOptionParam) {
        return new ResponseEntity<OptionOfPlaceDto>(optionOfPlaceService.update(placeOptionParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<OptionOfPlaceDto>> getAll(BasePagedParam pagingParam) {
        return new ResponseEntity<List<OptionOfPlaceDto>>(optionOfPlaceService.getAll(pagingParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<OptionOfPlaceDto> getById(Long id) {
        return new ResponseEntity<OptionOfPlaceDto>(optionOfPlaceService.getById(id), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<OptionOfPlaceDto> delete(OptionOfPlaceParam placeOptionParam) {
        OptionOfPlaceDto deletedOptionOfPlace = optionOfPlaceService.delete(placeOptionParam);
        return new ResponseEntity<OptionOfPlaceDto>(deletedOptionOfPlace, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Page<OptionOfPlaceDto>> query(BaseQuery<?> filter) {
        return null;
    }


    @Override
    @GetMapping("/getByPlaceId")
    public ResponseEntity<List<OptionOfPlaceDto>> getByPlaceId(PlaceParam placeParam) {
        return new ResponseEntity<List<OptionOfPlaceDto>>(optionOfPlaceService.getByPlaceId(placeParam.getId()), HttpStatus.OK);
    }
}