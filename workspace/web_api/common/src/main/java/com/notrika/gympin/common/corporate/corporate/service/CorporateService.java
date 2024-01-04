package com.notrika.gympin.common.corporate.corporate.service;

import com.notrika.gympin.common.finance.transaction.dto.FinanceCorporateDto;
import com.notrika.gympin.common.finance.transaction.dto.FinanceUserDto;
import com.notrika.gympin.common.finance.transaction.param.FinanceCorporateParam;
import com.notrika.gympin.common.finance.transaction.param.FinanceUserParam;
import com.notrika.gympin.common.util._base.base.BaseService;
import com.notrika.gympin.common.corporate.corporate.dto.CorporateDto;
import com.notrika.gympin.common.corporate.corporate.param.CorporateLogoParam;
import com.notrika.gympin.common.corporate.corporate.param.CorporateParam;
import com.notrika.gympin.common.corporate.corporate.query.CorporateQuery;
import com.notrika.gympin.common.corporate.corporatePersonnel.dto.CorporatePersonnelGroupDto;
import com.notrika.gympin.common.corporate.corporatePersonnel.param.CorporatePersonnelGroupParam;

import java.util.List;

public interface CorporateService extends BaseService<CorporateParam, CorporateDto, CorporateQuery> {

    CorporateDto updateStatus(CorporateParam userParam);
    CorporateDto updateStepPayment(CorporateParam userParam);
    CorporateDto updateLogo(CorporateLogoParam param);

    List<CorporatePersonnelGroupDto> getCorporateGroups(CorporateParam corporateParam);
    CorporatePersonnelGroupDto addGroup(CorporatePersonnelGroupParam Param);
    CorporatePersonnelGroupDto deleteGroup(CorporatePersonnelGroupParam Param);

    FinanceCorporateDto getFinanceCorporate(FinanceCorporateParam param);

}
