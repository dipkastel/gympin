package com.notrika.gympin.controller.impl.place.rateAndComment;

import com.notrika.gympin.common.place.placeBase.api.PlaceCommentController;
import com.notrika.gympin.common.place.placeBase.dto.PlaceCommentDto;
import com.notrika.gympin.common.place.placeBase.param.PlaceCommentParam;
import com.notrika.gympin.common.place.placeBase.query.PlaceCommentQuery;
import com.notrika.gympin.common.place.placeBase.service.PlaceCommentService;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import com.notrika.gympin.common.util.exception.general.FunctionNotAvalable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/placeComment")
public class PlaceCommentControllerImpl implements PlaceCommentController {

    @Autowired
    private PlaceCommentService placeCommentService;

    @Override
    public ResponseEntity<PlaceCommentDto> add(PlaceCommentParam param) {
        return new ResponseEntity<PlaceCommentDto>(placeCommentService.add(param), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<PlaceCommentDto> update( PlaceCommentParam param) {
        return new ResponseEntity<PlaceCommentDto>(placeCommentService.update(param), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<PlaceCommentDto>> getAll(BasePagedParam pagingParam) {
        return new ResponseEntity<List<PlaceCommentDto>>(placeCommentService.getAll(pagingParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<PlaceCommentDto> getById(Long id) {
        return new ResponseEntity<PlaceCommentDto>(placeCommentService.getById(id), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<PlaceCommentDto> delete(PlaceCommentParam param) {
        PlaceCommentDto placeCommentDto = placeCommentService.delete(param);
        return new ResponseEntity<PlaceCommentDto>(placeCommentDto, HttpStatus.OK);
    }


    @Override
    public ResponseEntity<Page<PlaceCommentDto>> query(PlaceCommentQuery filter) {
        return new ResponseEntity<>(placeCommentService.query(filter), HttpStatus.OK);
    }

}
