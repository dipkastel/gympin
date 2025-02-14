package com.notrika.gympin.common.corporate.corporatePersonnel.service;

import com.notrika.gympin.common.corporate.corporatePersonnel.dto.CorporatePersonnelCreditDto;
import com.notrika.gympin.common.corporate.corporatePersonnel.param.CorporatePersonnelCreditParam;
import com.notrika.gympin.common.finance.transaction.dto.FinanceUserDto;
import com.notrika.gympin.common.util._base.base.BaseService;
import com.notrika.gympin.common.util._base.query.BaseQuery;

import java.math.BigDecimal;
import java.util.List;

public interface CorporatePersonnelCreditService extends BaseService<CorporatePersonnelCreditParam, CorporatePersonnelCreditDto, BaseQuery<?>> {
    List<CorporatePersonnelCreditDto> addToAll(CorporatePersonnelCreditParam param);
    List<FinanceUserDto> addNWToAll(CorporatePersonnelCreditParam param);
    BigDecimal getTotalUserCredits(CorporatePersonnelCreditParam param);
    CorporatePersonnelCreditDto decreasePersonnelCredit(CorporatePersonnelCreditParam param);
    CorporatePersonnelCreditDto ExpirePersonnelCredit(CorporatePersonnelCreditParam param);}
