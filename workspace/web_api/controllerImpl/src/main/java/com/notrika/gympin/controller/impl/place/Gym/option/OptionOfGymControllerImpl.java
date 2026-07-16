package com.notrika.gympin.controller.impl.place.Gym.option;

import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import com.notrika.gympin.common.place.parts.option.api.OptionOfGymController;
import com.notrika.gympin.common.place.parts.option.dto.OptionOfPlaceDto;
import com.notrika.gympin.common.place.parts.option.param.OptionOfPlaceParam;
import com.notrika.gympin.common.place.parts.option.service.GymOptionsService;
import com.notrika.gympin.common.place.placeGym.Gym.param.PlaceGymParam;
import com.notrika.gympin.common.util.exception.general.FunctionNotAvalable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/OptionOfPlace")
public class OptionOfGymControllerImpl implements OptionOfGymController {

    @Autowired
    private GymOptionsService optionOfPlaceService;

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
        throw new FunctionNotAvalable();
    }


    @Override
    @GetMapping("/getByPlaceId")
    public ResponseEntity<List<OptionOfPlaceDto>> getByPlaceId(PlaceGymParam placeParam) {
        return new ResponseEntity<List<OptionOfPlaceDto>>(optionOfPlaceService.getByPlaceId(placeParam.getId()), HttpStatus.OK);
    }
}
