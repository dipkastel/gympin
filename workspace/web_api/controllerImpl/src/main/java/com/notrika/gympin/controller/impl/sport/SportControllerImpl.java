package com.notrika.gympin.controller.impl.sport;

import com.notrika.gympin.common.util._base.param.BasePagedParam;
import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
import com.notrika.gympin.common.sport.sport.api.SportController;
import com.notrika.gympin.common.sport.sport.dto.SportDto;
import com.notrika.gympin.common.sport.sport.param.SportParam;
import com.notrika.gympin.common.sport.sport.query.SportQuery;
import com.notrika.gympin.common.sport.sport.service.SportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/sport")
public class SportControllerImpl implements SportController {

    @Autowired
    private SportService sportService;

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<SportDto> add( SportParam sportParam) {
        return new ResponseEntity<>(sportService.add(sportParam), HttpStatus.OK);
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<SportDto> update( SportParam sportParam) {
        return new ResponseEntity<>(sportService.update(sportParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<SportDto> getById(Long id) {
        return new ResponseEntity<>(sportService.getById(id), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<SportDto>> getAll(BasePagedParam pagingParam) {
        return new ResponseEntity<>(sportService.getAll(pagingParam), HttpStatus.OK);
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<SportDto> delete(SportParam sportParam) {
        SportDto deletedSport = sportService.delete(sportParam);
        return new ResponseEntity<>(deletedSport, HttpStatus.OK);
    }

    @Override
    @GetMapping("/getSportMultimedia")
    public ResponseEntity<List<MultimediaDto>> getSportMultimedia(SportParam sportParam) {
        return new ResponseEntity<>(sportService.getSportMultimedia(sportParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Page<SportDto>> query(SportQuery filter) {
        return new ResponseEntity<>(sportService.query(filter), HttpStatus.OK);
    }

}
