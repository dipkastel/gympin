package com.notrika.gympin.controller.impl.place;

import com.notrika.gympin.common.place.personnel.api.PlacePersonnelController;
import com.notrika.gympin.common.place.personnel.dto.PlacePersonnelAccessDto;
import com.notrika.gympin.common.place.personnel.dto.PlacePersonnelBuyableAccessDto;
import com.notrika.gympin.common.place.personnel.dto.PlacePersonnelDto;
import com.notrika.gympin.common.place.personnel.param.PlacePersonnelAccessParam;
import com.notrika.gympin.common.place.personnel.param.PlacePersonnelBuyableAccessParam;
import com.notrika.gympin.common.place.personnel.param.PlacePersonnelParam;
import com.notrika.gympin.common.place.personnel.service.PlacePersonnelService;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymParam;
import com.notrika.gympin.common.user.user.param.UserParam;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.util.exception.general.FunctionNotAvalable;
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
        return new ResponseEntity<>(placePersonnelService.add(placePersonnelParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<PlacePersonnelDto> update(PlacePersonnelParam placePersonnelParam) {
        return new ResponseEntity<>(placePersonnelService.update(placePersonnelParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<PlacePersonnelDto> delete(PlacePersonnelParam placePersonnelParam) {
        return new ResponseEntity<>(placePersonnelService.delete(placePersonnelParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<PlacePersonnelDto>> getAll(BasePagedParam pagingParam) {
        return new ResponseEntity<>(placePersonnelService.getAll(pagingParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<PlacePersonnelDto> getById(Long id) {
        return new ResponseEntity<>(placePersonnelService.getById(id), HttpStatus.OK);
    }

    @Override
    @GetMapping("PersonnelByPlace")
    public ResponseEntity<List<PlacePersonnelDto>> getPersonnelByPlace(PlaceGymParam placeParam) {
        return new ResponseEntity<>(placePersonnelService.getPersonnelByPlace(placeParam), HttpStatus.OK);
    }

    @Override
    @GetMapping("PersonnelByUser")
    public ResponseEntity<List<PlacePersonnelDto>> getPersonnelByUser(UserParam userpara) {
        return new ResponseEntity<>(placePersonnelService.getPersonnelByUser(userpara), HttpStatus.OK);
    }

    @Override
    @GetMapping("getPlaceBeneficiaries")
    public ResponseEntity<List<PlacePersonnelDto>> getPlaceBeneficiaries(Long placeId) {
        return new ResponseEntity<>(placePersonnelService.getPlaceBeneficiaries(placeId), HttpStatus.OK);
    }

    @Override
    @GetMapping("getUserPlaceAccess")
    public ResponseEntity<List<PlacePersonnelAccessDto>> getUserPlaceAccess(Long placeId, Long userId) {
        return new ResponseEntity<>(placePersonnelService.getUserPlaceAccess(placeId, userId), HttpStatus.OK);
    }

    @Override
    @GetMapping("getUserPlaceBuyableAccess")
    public ResponseEntity<List<PlacePersonnelBuyableAccessDto>> getUserPlaceBuyableAccess(Long placeId, Long userId) {
        return new ResponseEntity<>(placePersonnelService.getUserPlaceBuyableAccess(placeId, userId), HttpStatus.OK);
    }

    @Override
    @PostMapping("updatePersonnelCommissionFee")
    public ResponseEntity<PlacePersonnelDto> updatePersonnelCommissionFee(@RequestBody PlacePersonnelParam param) {
        return new ResponseEntity<>(placePersonnelService.updatePersonnelCommissionFee(param), HttpStatus.OK);
    }

    @Override
    @PostMapping("updatePersonnelBuyableAccess")
    public ResponseEntity<List<PlacePersonnelBuyableAccessDto>> updatePersonnelBuyableAccess(@RequestBody List<PlacePersonnelBuyableAccessParam> param) {
        return new ResponseEntity<>(placePersonnelService.updatePersonnelBuyableAccess(param), HttpStatus.OK);
    }

    @Override
    @PostMapping("updatePersonnelAccess")
    public ResponseEntity<List<PlacePersonnelAccessDto>> updatePersonnelAccess(@RequestBody List<PlacePersonnelAccessParam> param) {
        return new ResponseEntity<>(placePersonnelService.updatePersonnelAccess(param), HttpStatus.OK);
    }

    @Override
    @PostMapping("addRole")
    public ResponseEntity<PlacePersonnelDto> addRole(@RequestBody PlacePersonnelParam param) {
        return new ResponseEntity<>(placePersonnelService.addPlacePersonnelRole(param), HttpStatus.OK);
    }

    @Override
    @PostMapping("deleteRole")
    public ResponseEntity<PlacePersonnelDto> deleteRole(@RequestBody PlacePersonnelParam param) {
        return new ResponseEntity<>(placePersonnelService.deletePlacePersonnelRole(param), HttpStatus.OK);
    }


    @Override
    public ResponseEntity<Page<PlacePersonnelDto>> query(BaseQuery<?> param) {
        throw new FunctionNotAvalable();
    }


}
