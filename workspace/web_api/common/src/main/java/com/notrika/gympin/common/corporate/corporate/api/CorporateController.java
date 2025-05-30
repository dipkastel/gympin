package com.notrika.gympin.common.corporate.corporate.api;

import com.notrika.gympin.common.corporate.corporate.param.*;
import com.notrika.gympin.common.finance.transaction.dto.CorporateTransactionDto;
import com.notrika.gympin.common.finance.transaction.dto.FinanceCorporateDto;
import com.notrika.gympin.common.finance.transaction.param.CorporateTransactionParam;
import com.notrika.gympin.common.finance.transaction.param.FinanceCorporateParam;
import com.notrika.gympin.common.settings.corporateSettings.dto.CorporateSettingDto;
import com.notrika.gympin.common.settings.corporateSettings.param.CorporateSettingParam;
import com.notrika.gympin.common.user.user.dto.InviteCode;
import com.notrika.gympin.common.util._base.base.BaseController;
import com.notrika.gympin.common.corporate.corporate.dto.CorporateDto;
import com.notrika.gympin.common.corporate.corporatePersonnel.dto.CorporatePersonnelGroupDto;
import com.notrika.gympin.common.corporate.corporatePersonnel.param.CorporatePersonnelGroupParam;
import com.notrika.gympin.common.corporate.corporate.query.CorporateQuery;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.math.BigDecimal;
import java.util.List;

public interface CorporateController extends BaseController<CorporateParam, CorporateDto, CorporateQuery> {

    ResponseEntity<CorporateDto> updateStatus(@RequestBody CorporateParam param);
    ResponseEntity<CorporateDto> updateLogo(@RequestBody CorporateLogoParam param);
    ResponseEntity<CorporateDto> updateContractType(@RequestBody CorporateContractTypeParam param);
    ResponseEntity<CorporateDto> updateContractDate(@RequestBody CorporateContractDateParam param);
    ResponseEntity<CorporateDto> updateDefaultExpireDuration(@RequestBody CorporateDedParam param);

    //transactions
    ResponseEntity<List<CorporateTransactionDto>> getTransactions(CorporateTransactionParam param);
    ResponseEntity<BigDecimal> getTotalIncreases(@RequestBody CorporateTransactionParam param);

    ResponseEntity<List<CorporatePersonnelGroupDto>> getCorporateGroups(CorporateParam param);
    ResponseEntity<FinanceCorporateDto> getFinanceCorporate(FinanceCorporateParam param);
    ResponseEntity<CorporatePersonnelGroupDto> addCorporateGroup(@RequestBody CorporatePersonnelGroupParam param);
    ResponseEntity<CorporatePersonnelGroupDto> deleteCorporateGroup(@RequestBody CorporatePersonnelGroupParam param);


    ResponseEntity<CorporateDto> updateContract(@RequestBody CorporateParam param);

    ResponseEntity<CorporateDto>  signContract(@RequestBody CorporateParam param);

    ResponseEntity<Boolean> sendContractCode(@RequestBody CorporateContractSmsParam param);

    ResponseEntity<List<CorporateSettingDto>> getCorporateSettings(CorporateSettingParam corporateSettingParam);

    ResponseEntity<CorporateSettingDto> SetCorporateSettings(@RequestBody CorporateSettingParam corporateSettingParam);

    ResponseEntity<InviteCode> getCorporateAffiliateCode(CorporateParam corporateParam);


}

