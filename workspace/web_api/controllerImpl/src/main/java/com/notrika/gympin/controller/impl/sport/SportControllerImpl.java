package com.notrika.gympin.controller.impl.sport;

import com.notrika.gympin.common.BaseFilter;
import com.notrika.gympin.common.BasePagedParam;
import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
import com.notrika.gympin.common.sport.api.SportController;
import com.notrika.gympin.common.sport.dto.SportDto;
import com.notrika.gympin.common.sport.param.SportParam;
import com.notrika.gympin.common.sport.service.SportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    //    @PostMapping("/addSport")
    public ResponseEntity<SportDto> add(@RequestBody SportParam sportParam) {
        return new ResponseEntity<SportDto>(sportService.add(sportParam), HttpStatus.OK);
    }

    @Override
    //    @PutMapping("/updateSport")
    public ResponseEntity<SportDto> update(@RequestBody SportParam sportParam) {
        return new ResponseEntity<SportDto>(sportService.update(sportParam), HttpStatus.OK);
    }

    @Override
    //    @GetMapping("/getSportById")
    public ResponseEntity<SportDto> getById(Long id) {
        return new ResponseEntity<SportDto>(sportService.getById(id), HttpStatus.OK);
    }

    @Override
    //    @GetMapping("/getAllSport")
    public ResponseEntity<List<SportDto>> getAll(BasePagedParam pagingParam) {
        return new ResponseEntity<List<SportDto>>(sportService.getAll(pagingParam), HttpStatus.OK);
    }

    @Override
    //    @PutMapping("/deleteSport")
    public ResponseEntity<SportDto> delete(SportParam sportParam) {
        SportDto deletedSport = sportService.delete(sportParam);
        return new ResponseEntity<SportDto>(deletedSport, HttpStatus.OK);
    }

    @Override
    @GetMapping("/getSportMultimedia")
    public ResponseEntity<List<MultimediaDto>> getSportMultimedia(SportParam sportParam) {
        return new ResponseEntity<List<MultimediaDto>>(sportService.getSportMultimedia(sportParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Long> countSearch(BaseFilter<?> filter) {
        return null;
    }

    @Override
    public ResponseEntity<List<SportDto>> search(BaseFilter<?> filter) {
        return null;
    }

    @Override
    public ResponseEntity<Long> countFilter(BaseFilter<?> filter) {
        return null;
    }

    @Override
    public ResponseEntity<List<SportDto>> filter(BaseFilter<?> filter) {
        return null;
    }
}
