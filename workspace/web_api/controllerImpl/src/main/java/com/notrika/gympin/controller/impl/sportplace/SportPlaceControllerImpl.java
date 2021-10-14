package com.notrika.gympin.controller.impl.sportplace;

import com.notrika.gympin.common.location.param.PlaceParam;
import com.notrika.gympin.common.sport.dto.SportDto;
import com.notrika.gympin.common.sportplace.api.SportPlaceController;
import com.notrika.gympin.common.sportplace.dto.SportPlaceDto;
import com.notrika.gympin.common.sportplace.param.SportPlaceParam;
import com.notrika.gympin.common.sportplace.service.SportPlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/sportPlace")
public class SportPlaceControllerImpl implements SportPlaceController {

    @Autowired
    private SportPlaceService sportPlaceService;

    @Override
    @PostMapping("addSportPlace")
    public ResponseEntity<SportPlaceDto> add(@RequestBody SportPlaceParam sportPlaceParam) {
        return new ResponseEntity<SportPlaceDto>(sportPlaceService.add(sportPlaceParam), HttpStatus.OK);
    }

    @Override
    @PutMapping("updateSportPlace")
    public ResponseEntity<SportPlaceDto> update(@RequestBody SportPlaceParam sportPlaceParam) {
        return new ResponseEntity<SportPlaceDto>(sportPlaceService.update(sportPlaceParam), HttpStatus.OK);
    }

    @Override
    @DeleteMapping("deleteSportPlace")
    public void delete(@RequestBody SportPlaceParam sportPlaceParam) {
        sportPlaceService.delete(sportPlaceParam);
    }

    @Override
    @GetMapping("getAllSportPlace")
    public ResponseEntity<List<SportPlaceDto>> getAll() {
        return new ResponseEntity<List<SportPlaceDto>>(sportPlaceService.getAll(), HttpStatus.OK);
    }

    @Override
    @GetMapping("getSportPlaceById")
    public ResponseEntity<SportPlaceDto> getById(long id) {
        return new ResponseEntity<SportPlaceDto>(sportPlaceService.getById(id), HttpStatus.OK);
    }

    @Override
    @GetMapping("getSportsByPlace")
    public ResponseEntity<List<SportDto>> getSportsByPlace(PlaceParam placeParam) {
        return new ResponseEntity<List<SportDto>>(sportPlaceService.getSportsByPlace(placeParam), HttpStatus.OK);
    }
}
