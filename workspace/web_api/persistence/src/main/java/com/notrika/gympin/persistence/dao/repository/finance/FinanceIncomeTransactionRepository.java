package com.notrika.gympin.persistence.dao.repository.finance;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.finance.income.FinanceIncomeTransactionEntity;
import com.notrika.gympin.persistence.entity.finance.user.FinanceUserTransactionEntity;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;

public interface FinanceIncomeTransactionRepository extends BaseRepository<FinanceIncomeTransactionEntity, Long> {


    @Query("SELECT SUM (a.amount) FROM FinanceIncomeTransactionEntity a")
    BigDecimal gympinTotalIncome();
}
