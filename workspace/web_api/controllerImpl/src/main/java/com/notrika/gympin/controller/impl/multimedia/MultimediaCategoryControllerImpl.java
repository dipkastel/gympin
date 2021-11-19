package com.notrika.gympin.controller.impl.multimedia;

import com.notrika.gympin.common.BaseParam;
import com.notrika.gympin.common.multimedia.api.MultimediaCategoryController;
import com.notrika.gympin.common.multimedia.dto.MultimediaCategoryDto;
import com.notrika.gympin.common.multimedia.param.MultimediaCategoryParam;
import com.notrika.gympin.common.multimedia.service.MultimediaCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/multimediacategory")
public class MultimediaCategoryControllerImpl implements MultimediaCategoryController {

    @Autowired
    private MultimediaCategoryService multimediaCategoryService;

    @Override
    public ResponseEntity<MultimediaCategoryDto> add(MultimediaCategoryParam param) {
        return new ResponseEntity<>(multimediaCategoryService.add(param), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<MultimediaCategoryDto> update(MultimediaCategoryParam param) {
        return new ResponseEntity<>(multimediaCategoryService.update(param),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<MultimediaCategoryDto> delete(MultimediaCategoryParam param) {
        return new ResponseEntity<>(multimediaCategoryService.delete(param),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<MultimediaCategoryDto>> getAll(BaseParam pagingParam) {
        return new ResponseEntity<>(multimediaCategoryService.getAll(pagingParam),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<MultimediaCategoryDto> getById(long id) {
        return new ResponseEntity<>(multimediaCategoryService.getById(id),HttpStatus.OK);
    }
}
