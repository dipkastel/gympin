package com.notrika.gympin.common.accounting.account.service;

import com.notrika.gympin.common.BaseFilter;
import com.notrika.gympin.common.BaseService;
import com.notrika.gympin.common.accounting.account.dto.AccountDto;
import com.notrika.gympin.common.accounting.account.param.AccountParam;

public interface AccountingService extends BaseService<AccountParam, AccountDto, BaseFilter<?>> {

}
