package com.notrika.gympin.common.corporate.corporatePersonnel.service;

import com.notrika.gympin.common.corporate.corporatePersonnel.dto.CorporatePersonnelDto;
import com.notrika.gympin.common.corporate.corporatePersonnel.param.CorporatePersonnelFileParam;
import com.notrika.gympin.common.finance.serial.param.SerialParam;
import com.notrika.gympin.common.util._base.base.BaseService;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.corporate.corporatePersonnel.dto.CorporatePersonnelCreditDto;
import com.notrika.gympin.common.corporate.corporatePersonnel.param.CorporatePersonnelCreditParam;

import java.math.BigDecimal;
import java.util.List;

public interface CorporatePersonnelCreditService extends BaseService<CorporatePersonnelCreditParam, CorporatePersonnelCreditDto, BaseQuery<?>> {
    List<CorporatePersonnelCreditDto> addToAll(CorporatePersonnelCreditParam param);
    BigDecimal getTotalUserCredits(CorporatePersonnelCreditParam param);
    CorporatePersonnelCreditDto decreasePersonnelCredit(CorporatePersonnelCreditParam param);
    CorporatePersonnelCreditDto ExpirePersonnelCredit(CorporatePersonnelCreditParam param);
}
