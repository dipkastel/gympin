package com.notrika.gympin.common.corporate.corporate.service;

import com.notrika.gympin.common.corporate.corporate.param.*;
import com.notrika.gympin.common.finance.transaction.dto.FinanceCorporateDto;
import com.notrika.gympin.common.finance.transaction.param.FinanceCorporateParam;
import com.notrika.gympin.common.user.user.dto.InviteCode;
import com.notrika.gympin.common.util._base.base.BaseService;
import com.notrika.gympin.common.corporate.corporate.dto.CorporateDto;
import com.notrika.gympin.common.corporate.corporate.query.CorporateQuery;
import com.notrika.gympin.common.corporate.corporatePersonnel.dto.CorporatePersonnelGroupDto;
import com.notrika.gympin.common.corporate.corporatePersonnel.param.CorporatePersonnelGroupParam;
import lombok.NonNull;

import java.util.List;

public interface CorporateService extends BaseService<CorporateParam, CorporateDto, CorporateQuery> {

    CorporateDto updateStatus(CorporateParam userParam);
    CorporateDto updateLogo(CorporateLogoParam param);
    CorporateDto updateContractType(CorporateContractTypeParam param);
    CorporateDto updateContractDate(@NonNull CorporateContractDateParam param);
    CorporateDto updateDed(@NonNull CorporateDedParam param);

    List<CorporatePersonnelGroupDto> getCorporateGroups(CorporateParam corporateParam);
    CorporatePersonnelGroupDto addGroup(CorporatePersonnelGroupParam Param);
    CorporatePersonnelGroupDto deleteGroup(CorporatePersonnelGroupParam Param);

    FinanceCorporateDto getFinanceCorporate(FinanceCorporateParam param);
    CorporateDto updateContract(CorporateParam corporateParam);
    Boolean sendContractCode(CorporateContractSmsParam param);
    CorporateDto signContract(CorporateParam corporateParam);

    InviteCode getAffiliateCode(Long id);
}
