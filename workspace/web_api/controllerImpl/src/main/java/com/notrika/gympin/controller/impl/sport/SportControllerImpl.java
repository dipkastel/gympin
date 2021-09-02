package com.notrika.gympin.controller.impl.sport;

import com.notrika.gympin.common.BaseDto;
import com.notrika.gympin.common.primitive.param.LongParam;
import com.notrika.gympin.common.sport.api.SportController;
import com.notrika.gympin.common.sport.dto.SportDto;
import com.notrika.gympin.common.sport.param.SportParam;
import com.notrika.gympin.common.sport.service.SportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/sport")
public class SportControllerImpl implements SportController {

    @Autowired
    private SportService sportService;

    @Override
    @PostMapping("/addSport")
    public ResponseEntity<SportDto> addSport(@RequestBody SportParam sportParam) {
        return new ResponseEntity<SportDto>(sportService.addSport(sportParam), HttpStatus.CREATED);
    }

    @Override
    @PutMapping("/updateSport")
    public ResponseEntity<SportDto> updateSport(@RequestBody SportParam sportParam) {
        return new ResponseEntity<SportDto>(sportService.updateSport(sportParam),HttpStatus.OK);
    }

    @Override
    @GetMapping("/getSportById")
    public ResponseEntity<SportDto> getSportById(LongParam id) {
        return new ResponseEntity<SportDto>(sportService.getSportById(id),HttpStatus.OK);
    }

    @Override
    @GetMapping("/getAllSport")
    public ResponseEntity<List<SportDto>> getAllSport() {
        return new ResponseEntity<List<SportDto>>(sportService.getAllSport(),HttpStatus.OK);
    }

    @Override
    @DeleteMapping("/deleteSport")
    public ResponseEntity<BaseDto> deleteSport(@RequestBody SportParam sportParam) {
        sportService.deleteSport(sportParam);
        return new ResponseEntity<BaseDto>(BaseDto.builder().id(sportParam.getId()).build(),HttpStatus.OK);
    }
}
