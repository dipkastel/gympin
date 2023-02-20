package com.notrika.gympin.common.corporate.corporate.service;

import com.notrika.gympin.common._base.base.BaseService;
import com.notrika.gympin.common.corporate.corporate.dto.CorporateDto;
import com.notrika.gympin.common.corporate.corporate.param.CorporateLogoParam;
import com.notrika.gympin.common.corporate.corporate.param.CorporateParam;
import com.notrika.gympin.common.corporate.corporate.query.CorporateQuery;
import com.notrika.gympin.common.user.param.UserParam;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface CorporateService extends BaseService<CorporateParam, CorporateDto, CorporateQuery> {

    List<CorporateDto> getByUser(UserParam userParam);
    CorporateDto updateStatus(CorporateParam userParam);
    CorporateDto updateLogo(CorporateLogoParam param);
}