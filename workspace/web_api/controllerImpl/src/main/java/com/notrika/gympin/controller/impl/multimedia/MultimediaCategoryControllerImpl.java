package com.notrika.gympin.controller.impl.multimedia;

import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common._base.param.BasePagedParam;
import com.notrika.gympin.common.multimedia.api.MultimediaCategoryController;
import com.notrika.gympin.common.multimedia.dto.MultimediaCategoryDto;
import com.notrika.gympin.common.multimedia.param.MultimediaCategoryParam;
import com.notrika.gympin.common.multimedia.service.MultimediaCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/multimediacategory")
public class MultimediaCategoryControllerImpl implements MultimediaCategoryController {

    @Autowired
    private MultimediaCategoryService multimediaCategoryService;

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN', 'MARKET', 'CONTENT', 'MANAGER', 'COACH', 'ATHLETE', 'USER')")
    public ResponseEntity<MultimediaCategoryDto> add(@RequestBody MultimediaCategoryParam param) {
        return new ResponseEntity<>(multimediaCategoryService.add(param), HttpStatus.OK);
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN', 'MARKET', 'CONTENT', 'MANAGER', 'COACH', 'ATHLETE', 'USER')")
    public ResponseEntity<MultimediaCategoryDto> update(@RequestBody MultimediaCategoryParam param) {
        return new ResponseEntity<>(multimediaCategoryService.update(param), HttpStatus.OK);
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN', 'MARKET', 'CONTENT', 'MANAGER', 'COACH', 'ATHLETE', 'USER')")
    public ResponseEntity<MultimediaCategoryDto> delete(@RequestBody MultimediaCategoryParam param) {
        return new ResponseEntity<>(multimediaCategoryService.delete(param), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<MultimediaCategoryDto>> getAll(BasePagedParam pagingParam) {
        return new ResponseEntity<>(multimediaCategoryService.getAll(pagingParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<MultimediaCategoryDto> getById(Long id) {
        return new ResponseEntity<>(multimediaCategoryService.getById(id), HttpStatus.OK);
    }


    @Override
    public ResponseEntity<Page<MultimediaCategoryDto>> query(BaseQuery<?> filter) {
        return null;
    }

}
