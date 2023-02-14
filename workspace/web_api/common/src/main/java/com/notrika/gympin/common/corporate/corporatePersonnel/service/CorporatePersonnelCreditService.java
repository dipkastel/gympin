package com.notrika.gympin.common.corporate.corporatePersonnel.service;

import com.notrika.gympin.common._base.base.BaseService;
import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common.corporate.corporatePersonnel.dto.CorporatePersonnelCreditDto;
import com.notrika.gympin.common.corporate.corporatePersonnel.param.CorporatePersonnelCreditParam;

import java.math.BigDecimal;
import java.util.List;

public interface CorporatePersonnelCreditService extends BaseService<CorporatePersonnelCreditParam, CorporatePersonnelCreditDto, BaseQuery<?>> {
    List<CorporatePersonnelCreditDto> addToAll(CorporatePersonnelCreditParam param);
    BigDecimal getTotalUserCredits(CorporatePersonnelCreditParam param);
}
