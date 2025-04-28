package com.notrika.gympin.common.finance.affiliate.service;

import com.notrika.gympin.common.finance.affiliate.dto.AffiliateDto;
import com.notrika.gympin.common.finance.affiliate.dto.AffiliateTPRegisterDto;
import com.notrika.gympin.common.finance.affiliate.param.AffiliateParam;
import com.notrika.gympin.common.finance.affiliate.param.AffiliateTPRegisterParam;
import com.notrika.gympin.common.finance.affiliate.query.AffiliateQuery;
import com.notrika.gympin.common.finance.suggest.dto.SuggestDto;
import com.notrika.gympin.common.finance.suggest.param.SuggestParam;
import com.notrika.gympin.common.finance.suggest.query.SuggestQuery;
import com.notrika.gympin.common.util._base.base.BaseService;
import org.springframework.web.bind.annotation.RequestBody;

import javax.naming.AuthenticationException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public interface AffiliateService extends BaseService<AffiliateParam, AffiliateDto, AffiliateQuery> {

    AffiliateTPRegisterDto tpRegister(HttpServletRequest request,AffiliateTPRegisterParam param) throws Exception;

}
