package com.notrika.gympin.controller.impl.place.Counseling;

import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
import com.notrika.gympin.common.place.placeBase.param.PlaceContractSmsParam;
import com.notrika.gympin.common.place.placeBase.param.PlaceMultimediaListParam;
import com.notrika.gympin.common.place.placeBase.param.PlaceMultimediaParam;
import com.notrika.gympin.common.place.placeCounseling.Counseling.api.PlaceCounselingController;
import com.notrika.gympin.common.place.placeCounseling.Counseling.dto.CounselingDto;
import com.notrika.gympin.common.place.placeCounseling.Counseling.param.CounselingParam;
import com.notrika.gympin.common.place.placeCounseling.Counseling.query.CounselingQuery;
import com.notrika.gympin.common.place.placeCounseling.Counseling.service.CounselingService;
import com.notrika.gympin.common.place.placeCounseling.Proficiencies.dto.ProficienciesDto;
import com.notrika.gympin.common.settings.location.param.LocationParam;
import com.notrika.gympin.common.ticket.buyable.dto.TicketBuyableDto;
import com.notrika.gympin.common.user.user.dto.InviteCode;
import com.notrika.gympin.common.user.user.param.UserParam;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/counseling")
public class PlaceCounselingControllerImpl implements PlaceCounselingController {

    @Autowired
    CounselingService counselingService;


    @Override
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN','MANAGER')")
    public ResponseEntity<CounselingDto> add(CounselingParam placeParam) {
        return new ResponseEntity<>(counselingService.add(placeParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<CounselingDto> update(CounselingParam placeParam) {
        return new ResponseEntity<>(counselingService.update(placeParam), HttpStatus.OK);
    }

    @Override
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN','MANAGER')")
    public ResponseEntity<CounselingDto> delete(CounselingParam placeParam) {
        return new ResponseEntity<>(counselingService.delete(placeParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<CounselingDto>> getAll(BasePagedParam pagingParam) {
        return new ResponseEntity<>(counselingService.getAll(pagingParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<CounselingDto> getById(Long id) {
        return new ResponseEntity<>(counselingService.getById(id), HttpStatus.OK);
    }


    @Override
    public ResponseEntity<Page<CounselingDto>> query(CounselingQuery filter) {
        return new ResponseEntity<>(counselingService.query(filter), HttpStatus.OK);
    }

    @Override
    @GetMapping("/getMultimedias")
    public ResponseEntity<List<MultimediaDto>> getMultimedias(CounselingParam place) {
        return ResponseEntity.ok(counselingService.getMultimedias(place));
    }

    @Override
    @GetMapping("/getMyPlaceCounselingById")
    public ResponseEntity<CounselingDto> getMyPlaceCounselingById(Long id) {
        return new ResponseEntity<>(counselingService.getById(id), HttpStatus.OK);
    }

    @Override
    @PostMapping("/addMultimedia")
    public ResponseEntity<CounselingDto> addMultimedia(PlaceMultimediaParam param) {
        return ResponseEntity.ok(counselingService.addMultimedia(param));
    }

    @Override
    @PostMapping("/setDefaultMultimedia")
    public ResponseEntity<CounselingDto> setDefaultMultimedia(PlaceMultimediaParam param) {
        return ResponseEntity.ok(counselingService.setDefaultMultimedia(param));
    }

    @Override
    @PutMapping("/deleteMultimedia")
    public ResponseEntity<CounselingDto> deleteMultimedia(PlaceMultimediaParam param) {
        return ResponseEntity.ok(counselingService.removeMultimedia(param));
    }


    @Override
    @PostMapping("/addMultimediaList")
    public ResponseEntity<CounselingDto> addMultimediaList(PlaceMultimediaListParam param) {
        return ResponseEntity.ok(counselingService.addMultimediaList(param));
    }

    @Override
    @PostMapping("/updateOrder")
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN','MANAGER')")
    public ResponseEntity<CounselingDto> updateOrder(CounselingParam param) {
        return ResponseEntity.ok(counselingService.updateOrder(param));
    }

    @Override
    @PutMapping("/changeStatus")
    public ResponseEntity<CounselingDto> changeStatus(CounselingParam param) {
        return new ResponseEntity<>(counselingService.changeStatus(param), HttpStatus.OK);
    }

    @Override
    @GetMapping("/getPlacesByLocation")
    public ResponseEntity<List<CounselingDto>> getPlacesByLocation(LocationParam param) {
        return new ResponseEntity<>(counselingService.getPlacesByLocation(param), HttpStatus.OK);
    }

    @Override
    @GetMapping("/getPlacesByUser")
    public ResponseEntity<List<CounselingDto>> getPlaceByUser(UserParam userParam) {
        return new ResponseEntity<>(counselingService.getPlacesByUser(userParam), HttpStatus.OK);
    }

    @Override
    @GetMapping("/getProficienciesOfCounseling")
    public ResponseEntity<List<ProficienciesDto>> getProficienciesOfCounseling(CounselingParam place) {
        return ResponseEntity.ok(counselingService.getProficienciesOfCounseling(place));
    }

    @Override
    @GetMapping("/getPlacesInviteCode")
    public ResponseEntity<InviteCode> getPlaceInviteCode(CounselingParam placeParam) {
        return new ResponseEntity<>(counselingService.getPlaceInviteCode(placeParam), HttpStatus.OK);
    }

    @Override
    @GetMapping("/getBuyableByPlace")
    public ResponseEntity<List<TicketBuyableDto>> getBuyableByPlace(CounselingParam placeParam) {
        return new ResponseEntity<>(counselingService.getBuyableByPlace(placeParam), HttpStatus.OK);
    }


    @Override
    @PostMapping("/updateContract")
    public ResponseEntity<CounselingDto> updateContract(CounselingParam param) {
        return ResponseEntity.ok(counselingService.updateContract(param));
    }

    @Override
    @PostMapping("/signContract")
    public ResponseEntity<CounselingDto> signContract(CounselingParam param) {
        return ResponseEntity.ok(counselingService.signContract(param));
    }

    @Override
    @PostMapping("/sendContractCode")
    public ResponseEntity<Boolean> sendContractCode(PlaceContractSmsParam param) {
        return new ResponseEntity<>(counselingService.sendContractCode(param), HttpStatus.OK);
    }


}
