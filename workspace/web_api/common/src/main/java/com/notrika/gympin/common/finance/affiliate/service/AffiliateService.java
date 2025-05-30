package com.notrika.gympin.common.finance.affiliate.service;

import com.notrika.gympin.common.corporate.corporate.dto.CorporateDto;
import com.notrika.gympin.common.finance.affiliate.dto.AffiliateDto;
import com.notrika.gympin.common.finance.affiliate.dto.AffiliateTPRegisterDto;
import com.notrika.gympin.common.finance.affiliate.param.AffiliateAddCorporateParam;
import com.notrika.gympin.common.finance.affiliate.param.AffiliateAddPlaceParam;
import com.notrika.gympin.common.finance.affiliate.param.AffiliateParam;
import com.notrika.gympin.common.finance.affiliate.param.AffiliateTPRegisterParam;
import com.notrika.gympin.common.finance.affiliate.query.AffiliateQuery;
import com.notrika.gympin.common.place.placeGym.dto.PlaceGymDto;
import com.notrika.gympin.common.util._base.base.BaseService;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface AffiliateService extends BaseService<AffiliateParam, AffiliateDto, AffiliateQuery> {

    AffiliateTPRegisterDto tpRegister(HttpServletRequest request,AffiliateTPRegisterParam param) throws Exception;
    CorporateDto AddCorporatesToAffiliator(AffiliateAddCorporateParam param);
    List<CorporateDto> getCorporatesByAffiliatorId(Long id);
    PlaceGymDto AddPlaceToAffiliator(AffiliateAddPlaceParam param);
    List<PlaceGymDto> getPlacesByAffiliatorId(Long id);

    CorporateDto RemoveCorporatesToAffiliator(AffiliateAddCorporateParam param);
    PlaceGymDto RemovePlaceToAffiliator(AffiliateAddPlaceParam param);

}
