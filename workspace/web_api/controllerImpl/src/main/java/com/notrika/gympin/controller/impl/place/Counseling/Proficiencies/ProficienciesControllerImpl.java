package com.notrika.gympin.controller.impl.place.Counseling.Proficiencies;

import com.notrika.gympin.common.place.placeCounseling.Proficiencies.api.ProficienciesController;
import com.notrika.gympin.common.place.placeCounseling.Proficiencies.dto.ProficienciesDto;
import com.notrika.gympin.common.place.placeCounseling.Proficiencies.param.ProficienciesParam;
import com.notrika.gympin.common.place.placeCounseling.Proficiencies.query.ProficienciesQuery;
import com.notrika.gympin.common.place.placeCounseling.Proficiencies.service.ProficienciesService;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/proficiencies")
public class ProficienciesControllerImpl implements ProficienciesController {

    @Autowired
    private ProficienciesService proficienciesService;

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<ProficienciesDto> add(ProficienciesParam param) {
        return new ResponseEntity<>(proficienciesService.add(param), HttpStatus.OK);
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<ProficienciesDto> update(ProficienciesParam param) {
        return new ResponseEntity<>(proficienciesService.update(param), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ProficienciesDto> getById(Long id) {
        return new ResponseEntity<>(proficienciesService.getById(id), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<ProficienciesDto>> getAll(BasePagedParam pagingParam) {
        return new ResponseEntity<>(proficienciesService.getAll(pagingParam), HttpStatus.OK);
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<ProficienciesDto> delete(ProficienciesParam param) {
        ProficienciesDto deletedSport = proficienciesService.delete(param);
        return new ResponseEntity<>(deletedSport, HttpStatus.OK);
    }


    @Override
    public ResponseEntity<Page<ProficienciesDto>> query(ProficienciesQuery filter) {
        return new ResponseEntity<>(proficienciesService.query(filter), HttpStatus.OK);
    }

}
