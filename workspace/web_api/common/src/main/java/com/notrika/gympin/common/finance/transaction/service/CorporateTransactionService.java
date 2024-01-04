package com.notrika.gympin.common.finance.transaction.service;

import com.notrika.gympin.common.finance.transaction.dto.CorporateTransactionDto;
import com.notrika.gympin.common.finance.transaction.param.CorporateTransactionParam;
import com.notrika.gympin.common.finance.transaction.query.CorporateTransactionQuery;
import com.notrika.gympin.common.util._base.base.BaseService;

import java.util.List;

public interface CorporateTransactionService extends BaseService<CorporateTransactionParam, CorporateTransactionDto, CorporateTransactionQuery> {

    List<CorporateTransactionDto> getByCorporate(Long corporateId);
    List<CorporateTransactionDto> getByPersonel(Long personnelId);

}
