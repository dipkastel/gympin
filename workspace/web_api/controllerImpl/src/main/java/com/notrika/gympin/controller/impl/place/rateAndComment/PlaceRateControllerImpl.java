package com.notrika.gympin.controller.impl.place.rateAndComment;

import com.notrika.gympin.common.place.placeBase.api.PlaceRateController;
import com.notrika.gympin.common.place.placeBase.dto.PlaceRateDto;
import com.notrika.gympin.common.place.placeBase.param.PlaceRateParam;
import com.notrika.gympin.common.place.placeBase.query.PlaceRateQuery;
import com.notrika.gympin.common.place.placeBase.service.PlaceRateService;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymParam;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import com.notrika.gympin.common.util._base.query.BaseQuery;
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
@RequestMapping("/api/v1/placeRate")
public class PlaceRateControllerImpl implements PlaceRateController {

    @Autowired
    private PlaceRateService placeRateService;

    @Override
    public ResponseEntity<PlaceRateDto> add(PlaceRateParam param) {
        return new ResponseEntity<PlaceRateDto>(placeRateService.add(param), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<PlaceRateDto> update( PlaceRateParam param) {
        throw new FunctionNotAvalable();
    }

    @Override
    public ResponseEntity<List<PlaceRateDto>> getAll(BasePagedParam pagingParam) {
        throw new FunctionNotAvalable();
    }

    @Override
    public ResponseEntity<PlaceRateDto> getById(Long id) {
        throw new FunctionNotAvalable();
    }

    @Override
    public ResponseEntity<PlaceRateDto> delete(PlaceRateParam param) {
        throw new FunctionNotAvalable();
    }


    @Override
    public ResponseEntity<Page<PlaceRateDto>> query(PlaceRateQuery filter) {
        throw new FunctionNotAvalable();
    }

}
