package com.notrika.gympin.common.corporate.corporatePersonnel.api;

import com.notrika.gympin.common.corporate.corporate.param.CorporateParam;
import com.notrika.gympin.common.corporate.corporatePersonnel.dto.CorporatePersonnelCreditDto;
import com.notrika.gympin.common.corporate.corporatePersonnel.dto.CorporatePersonnelDto;
import com.notrika.gympin.common.corporate.corporatePersonnel.param.*;
import com.notrika.gympin.common.corporate.corporatePersonnel.query.CorporatePersonnelQuery;
import com.notrika.gympin.common.finance.transaction.dto.FinanceUserDto;
import com.notrika.gympin.common.user.user.param.UserParam;
import com.notrika.gympin.common.util._base.base.BaseController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.math.BigDecimal;
import java.util.List;

public interface CorporatePersonnelController extends BaseController<CorporatePersonnelParam, CorporatePersonnelDto, CorporatePersonnelQuery> {

    ResponseEntity<List<CorporatePersonnelDto>> addList(CorporatePersonnelFileParam param);

    ResponseEntity<Boolean> addPersonnelByList(@RequestBody List<CorporatePersonnelListItem> param);

    ResponseEntity<List<CorporatePersonnelDto>> getPersonnelByCorporate(CorporateParam corporateParam);

    ResponseEntity<List<CorporatePersonnelDto>> getCorporateByUser(UserParam userParam);

    ResponseEntity<List<CorporatePersonnelDto>> getCorporateOwnedByUser(UserParam userParam);

    ResponseEntity<CorporatePersonnelCreditDto> addPersonnelCredit(@RequestBody CorporatePersonnelCreditParam param);

    ResponseEntity<CorporatePersonnelCreditDto> decreaseUserCredit(@RequestBody CorporatePersonnelCreditParam param);

    ResponseEntity<CorporatePersonnelCreditDto> manualExpireUserCredit(@RequestBody CorporatePersonnelCreditParam param);

    ResponseEntity<List<CorporatePersonnelCreditDto>> addToAllPersonnelCredit(@RequestBody CorporatePersonnelCreditParam param);

    ResponseEntity<List<FinanceUserDto>> addNWToAllPersonnelCredit(@RequestBody CorporatePersonnelCreditParam param);

    ResponseEntity<BigDecimal> getTotalUserCredits(CorporatePersonnelCreditParam param);

    ResponseEntity<Boolean> setPersonelAccessToCatering(@RequestBody CorporatePersonnelCateringAccessParam param);

    ResponseEntity<Boolean> setAllPersonelAccessToCatering(@RequestBody CorporatePersonnelCateringAccessParam param);
}
