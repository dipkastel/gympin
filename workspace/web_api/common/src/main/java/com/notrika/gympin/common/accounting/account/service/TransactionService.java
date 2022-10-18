package com.notrika.gympin.common.accounting.account.service;

import com.notrika.gympin.common.BaseFilter;
import com.notrika.gympin.common.BaseService;
import com.notrika.gympin.common.accounting.account.dto.OverallGymTransactionDto;
import com.notrika.gympin.common.accounting.account.dto.OverallSportsTransactionDto;
import com.notrika.gympin.common.accounting.account.dto.SemiOverallTransactionDto;
import com.notrika.gympin.common.accounting.account.dto.TransactionDto;
import com.notrika.gympin.common.accounting.account.param.TransactionParam;
import com.notrika.gympin.common.user.dto.UserDto;

import java.math.BigDecimal;

public interface TransactionService extends BaseService<TransactionParam, TransactionDto, BaseFilter<?>> {

    TransactionDto deposit(BigDecimal amount);

    OverallSportsTransactionDto getSportsOverallTransaction();

    SemiOverallTransactionDto getSemiOverallTransactions();

}
