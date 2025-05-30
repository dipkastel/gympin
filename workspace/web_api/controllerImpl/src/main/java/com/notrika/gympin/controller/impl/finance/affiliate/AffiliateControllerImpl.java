package com.notrika.gympin.controller.impl.finance.affiliate;

import com.notrika.gympin.common.corporate.corporate.dto.CorporateDto;
import com.notrika.gympin.common.finance.affiliate.api.AffiliateController;
import com.notrika.gympin.common.finance.affiliate.dto.AffiliateDto;
import com.notrika.gympin.common.finance.affiliate.dto.AffiliateTPRegisterDto;
import com.notrika.gympin.common.finance.affiliate.param.AffiliateAddCorporateParam;
import com.notrika.gympin.common.finance.affiliate.param.AffiliateAddPlaceParam;
import com.notrika.gympin.common.finance.affiliate.param.AffiliateParam;
import com.notrika.gympin.common.finance.affiliate.param.AffiliateTPRegisterParam;
import com.notrika.gympin.common.finance.affiliate.query.AffiliateQuery;
import com.notrika.gympin.common.finance.affiliate.service.AffiliateService;
import com.notrika.gympin.common.place.placeGym.dto.PlaceGymDto;
import com.notrika.gympin.common.user.user.service.UserService;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/v1/affiliate/")
public class AffiliateControllerImpl implements AffiliateController {

    @Autowired
    AffiliateService affiliateService;

    @Autowired
    UserService userService;

    @Override
    public ResponseEntity<AffiliateDto> add(AffiliateParam param) {
        return ResponseEntity.ok(affiliateService.add(param));
    }

    @Override
    @PostMapping("TPRegister")
    public ResponseEntity<AffiliateTPRegisterDto> tpRegister(HttpServletRequest request, AffiliateTPRegisterParam param) throws Exception {
        return ResponseEntity.ok(affiliateService.tpRegister(request, param));
    }

    @Override
    @PostMapping("AddCorporatesToAffiliator")
    public ResponseEntity<CorporateDto> AddCorporatesToAffiliator(AffiliateAddCorporateParam param) {
        return ResponseEntity.ok(affiliateService.AddCorporatesToAffiliator(param));
    }

    @Override
    @PostMapping("RemoveCorporatesToAffiliator")
    public ResponseEntity<CorporateDto> RemoveCorporatesToAffiliator(AffiliateAddCorporateParam param) {
        return ResponseEntity.ok(affiliateService.RemoveCorporatesToAffiliator(param));
    }

    @Override
    @GetMapping("getCorporatesByAffiliatorId")
    public ResponseEntity<List<CorporateDto>> getCorporatesByAffiliatorId(Long id) {
        return ResponseEntity.ok(affiliateService.getCorporatesByAffiliatorId(id));
    }

    @Override
    @PostMapping("AddPlaceToAffiliator")
    public ResponseEntity<PlaceGymDto> AddPlaceToAffiliator(AffiliateAddPlaceParam param) {
        return ResponseEntity.ok(affiliateService.AddPlaceToAffiliator(param));
    }

    @Override
    @PostMapping("RemovePlaceToAffiliator")
    public ResponseEntity<PlaceGymDto> RemovePlaceToAffiliator(AffiliateAddPlaceParam param) {
        return ResponseEntity.ok(affiliateService.RemovePlaceToAffiliator(param));
    }

    @Override
    @GetMapping("getPlacesByAffiliatorId")
    public ResponseEntity<List<PlaceGymDto>> getPlacesByAffiliatorId(Long id) {
        return ResponseEntity.ok(affiliateService.getPlacesByAffiliatorId(id));
    }

    @Override
    public ResponseEntity<AffiliateDto> update(AffiliateParam param) {
        return ResponseEntity.ok(affiliateService.update(param));
    }

    @Override
    public ResponseEntity<AffiliateDto> delete(AffiliateParam param) {
        return ResponseEntity.ok(affiliateService.delete(param));
    }

    @Override
    public ResponseEntity<List<AffiliateDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(affiliateService.getAll(pagingParam));
    }

    @Override
    public ResponseEntity<AffiliateDto> getById(Long id) {
        return ResponseEntity.ok(affiliateService.getById(id));
    }


    @Override
    public ResponseEntity<Page<AffiliateDto>> query(AffiliateQuery param) {
        return ResponseEntity.ok(affiliateService.query(param));
    }

}
