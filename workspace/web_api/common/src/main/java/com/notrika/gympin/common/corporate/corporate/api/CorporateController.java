package com.notrika.gympin.common.corporate.corporate.api;

import com.notrika.gympin.common._base.base.BaseController;
import com.notrika.gympin.common.corporate.corporate.dto.CorporateDto;
import com.notrika.gympin.common.corporate.corporatePersonnel.dto.CorporatePersonnelCategoryDto;
import com.notrika.gympin.common.corporate.corporatePersonnel.param.CorporatePersonnelCategoryParam;
import com.notrika.gympin.common.transaction.dto.TransactionDto;
import com.notrika.gympin.common.corporate.corporate.param.CorporateLogoParam;
import com.notrika.gympin.common.corporate.corporate.param.CorporateParam;
import com.notrika.gympin.common.transaction.param.TransactionParam;
import com.notrika.gympin.common.corporate.corporate.query.CorporateQuery;
import com.notrika.gympin.common.user.param.UserParam;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.math.BigDecimal;
import java.util.List;

public interface CorporateController extends BaseController<CorporateParam, CorporateDto, CorporateQuery> {

    ResponseEntity<CorporateDto> updateStatus(@RequestBody CorporateParam param);
    ResponseEntity<CorporateDto> updateLogo(@RequestBody CorporateLogoParam param);

    //transactions
    ResponseEntity<List<TransactionDto>> getTransactions(TransactionParam param);
    ResponseEntity<BigDecimal> getTotalDeposit(TransactionParam param);

    ResponseEntity<List<CorporatePersonnelCategoryDto>> getCorporateCategories(CorporateParam param);
    ResponseEntity<CorporatePersonnelCategoryDto> addCorporateCategory(@RequestBody CorporatePersonnelCategoryParam param);
    ResponseEntity<CorporatePersonnelCategoryDto> deleteCorporateCategory(CorporatePersonnelCategoryParam param);


}

