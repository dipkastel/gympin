package com.notrika.gympin.controller.impl.place.Counseling.counselingProficiencies;

import com.notrika.gympin.common.place.placeCounseling.Counseling.param.CounselingParam;
import com.notrika.gympin.common.place.placeCounseling.CounselingProficiencies.api.CounselingProficiencyController;
import com.notrika.gympin.common.place.placeCounseling.CounselingProficiencies.dto.CounselingProficienciesDto;
import com.notrika.gympin.common.place.placeCounseling.CounselingProficiencies.param.CounselingProficienciesParam;
import com.notrika.gympin.common.place.placeCounseling.CounselingProficiencies.service.CounselingProficienciesService;
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
@RequestMapping("/api/v1/CounselingProficiencies")
public class CounselingProficienciesControllerImpl implements CounselingProficiencyController {

    @Autowired
    private CounselingProficienciesService counselingProficienciesService;

    @Override
    public ResponseEntity<CounselingProficienciesDto> add(CounselingProficienciesParam param) {
        return new ResponseEntity<CounselingProficienciesDto>(counselingProficienciesService.add(param), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<CounselingProficienciesDto> update(CounselingProficienciesParam param) {
        return new ResponseEntity<CounselingProficienciesDto>(counselingProficienciesService.update(param), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<CounselingProficienciesDto> delete(CounselingProficienciesParam param) {
        var deleted = counselingProficienciesService.delete(param);
        return new ResponseEntity<CounselingProficienciesDto>(deleted, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<CounselingProficienciesDto>> getAll(BasePagedParam pagingParam) {
        return new ResponseEntity<List<CounselingProficienciesDto>>(counselingProficienciesService.getAll(pagingParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<CounselingProficienciesDto> getById(Long id) {
        return new ResponseEntity<CounselingProficienciesDto>(counselingProficienciesService.getById(id), HttpStatus.OK);
    }


    @Override
    public ResponseEntity<Page<CounselingProficienciesDto>> query(BaseQuery<?> filter) {
        throw new FunctionNotAvalable();
    }

    @Override
    @GetMapping("getCounselingProficiencies")
    public ResponseEntity<List<CounselingProficienciesDto>> getCounselingProficiencies(CounselingParam param) {
        return new ResponseEntity<List<CounselingProficienciesDto>>(counselingProficienciesService.getCounselingProficiencies(param), HttpStatus.OK);
    }
}
