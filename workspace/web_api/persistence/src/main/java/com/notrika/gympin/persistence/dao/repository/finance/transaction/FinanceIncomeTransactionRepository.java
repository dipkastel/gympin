package com.notrika.gympin.persistence.dao.repository.finance.transaction;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.finance.transactions.gympin.FinanceIncomeTransactionEntity;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;

public interface FinanceIncomeTransactionRepository extends BaseRepository<FinanceIncomeTransactionEntity, Long> {


    @Query("SELECT SUM (a.amount) FROM FinanceIncomeTransactionEntity a")
    BigDecimal gympinTotalIncome();
}
