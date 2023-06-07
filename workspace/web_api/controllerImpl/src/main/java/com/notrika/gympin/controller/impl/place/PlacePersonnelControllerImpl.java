package com.notrika.gympin.controller.impl.place;

import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common._base.param.BasePagedParam;
import com.notrika.gympin.common.place.personnel.api.PlacePersonnelController;
import com.notrika.gympin.common.place.personnel.dto.PlacePersonnelAccessDto;
import com.notrika.gympin.common.place.personnel.dto.PlacePersonnelDto;
import com.notrika.gympin.common.place.personnel.dto.PlacePersonnelGateAccessDto;
import com.notrika.gympin.common.place.personnel.param.PlacePersonnelAccessParam;
import com.notrika.gympin.common.place.personnel.param.PlacePersonnelGateAccessParam;
import com.notrika.gympin.common.place.personnel.param.PlacePersonnelParam;
import com.notrika.gympin.common.place.personnel.service.PlacePersonnelService;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/placePersonnel")
public class PlacePersonnelControllerImpl implements PlacePersonnelController {

    @Autowired
    private PlacePersonnelService placePersonnelService;


    @Override
    public ResponseEntity<PlacePersonnelDto> add(PlacePersonnelParam placePersonnelParam) {
        return new ResponseEntity<>(placePersonnelService.add(placePersonnelParam),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<PlacePersonnelDto> update(PlacePersonnelParam placePersonnelParam) {
        return new ResponseEntity<>(placePersonnelService.update(placePersonnelParam),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<PlacePersonnelDto> delete(PlacePersonnelParam placePersonnelParam) {
        return new ResponseEntity<>(placePersonnelService.delete(placePersonnelParam),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<PlacePersonnelDto>> getAll(BasePagedParam pagingParam) {
        return new ResponseEntity<>(placePersonnelService.getAll(pagingParam),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<PlacePersonnelDto> getById(Long id) {
        return new ResponseEntity<>(placePersonnelService.getById(id),HttpStatus.OK);
    }

    @Override
    @GetMapping("PersonnelByPlace")
    public ResponseEntity<List<PlacePersonnelDto>> getPersonnelByPlace(PlaceParam placeParam) {
        return new ResponseEntity<>(placePersonnelService.getPersonnelByPlace(placeParam),HttpStatus.OK);
    }

    @Override
    @GetMapping("getUserPlaceAccess")
    public ResponseEntity<List<PlacePersonnelAccessDto>> getUserPlaceAccess(Long placeId, Long userId) {
        return new ResponseEntity<>(placePersonnelService.getUserPlaceAccess(placeId,userId),HttpStatus.OK);
    }

    @Override
    @GetMapping("getUserPlaceGateAccess")
    public ResponseEntity<List<PlacePersonnelGateAccessDto>> getUserPlaceGateAccess(Long placeId, Long userId) {
        return new ResponseEntity<>(placePersonnelService.getUserPlaceGateAccess(placeId,userId),HttpStatus.OK);
    }

    @Override
    @PostMapping("updatePersonnelGateAccess")
    public ResponseEntity<List<PlacePersonnelGateAccessDto>> updatePersonnelGateAccess(List<PlacePersonnelGateAccessParam> param) {
        return new ResponseEntity<>(placePersonnelService.updatePersonnelGateAccess(param),HttpStatus.OK);
    }

    @Override
    @PostMapping("updatePersonnelAccess")
    public ResponseEntity<List<PlacePersonnelAccessDto>> updatePersonnelAccess(List<PlacePersonnelAccessParam> param) {
        return new ResponseEntity<>(placePersonnelService.updatePersonnelAccess(param),HttpStatus.OK);
    }


    @Override
    public ResponseEntity<Page<PlacePersonnelDto>> query(BaseQuery<?> param) {
        return null;
    }


}
