package com.notrika.gympin.common.finance.affiliate.api;

import com.notrika.gympin.common.corporate.corporate.dto.CorporateDto;
import com.notrika.gympin.common.finance.affiliate.dto.AffiliateDto;
import com.notrika.gympin.common.finance.affiliate.dto.AffiliateTPRegisterDto;
import com.notrika.gympin.common.finance.affiliate.param.AffiliateAddCorporateParam;
import com.notrika.gympin.common.finance.affiliate.param.AffiliateAddPlaceParam;
import com.notrika.gympin.common.finance.affiliate.param.AffiliateParam;
import com.notrika.gympin.common.finance.affiliate.param.AffiliateTPRegisterParam;
import com.notrika.gympin.common.finance.affiliate.query.AffiliateQuery;
import com.notrika.gympin.common.finance.suggest.dto.SuggestDto;
import com.notrika.gympin.common.finance.suggest.param.SuggestParam;
import com.notrika.gympin.common.finance.suggest.query.SuggestQuery;
import com.notrika.gympin.common.place.place.dto.PlaceDto;
import com.notrika.gympin.common.util._base.base.BaseController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;


public interface AffiliateController extends BaseController<AffiliateParam, AffiliateDto, AffiliateQuery> {
    ResponseEntity<AffiliateTPRegisterDto> tpRegister(HttpServletRequest request,@RequestBody AffiliateTPRegisterParam param) throws Exception;

    ResponseEntity<CorporateDto> AddCorporatesToAffiliator(@RequestBody AffiliateAddCorporateParam param);
    ResponseEntity<CorporateDto> RemoveCorporatesToAffiliator(@RequestBody AffiliateAddCorporateParam param);
    ResponseEntity<List<CorporateDto>> getCorporatesByAffiliatorId(Long id);
    ResponseEntity<PlaceDto> AddPlaceToAffiliator(@RequestBody AffiliateAddPlaceParam param);
    ResponseEntity<PlaceDto> RemovePlaceToAffiliator(@RequestBody AffiliateAddPlaceParam param);
    ResponseEntity<List<PlaceDto>> getPlacesByAffiliatorId(Long id);

}
