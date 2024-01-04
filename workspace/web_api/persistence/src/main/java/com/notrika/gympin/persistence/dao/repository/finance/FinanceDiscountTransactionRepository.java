package com.notrika.gympin.persistence.dao.repository.finance;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.finance.income.FinanceDiscountTransactionEntity;
import com.notrika.gympin.persistence.entity.finance.income.FinanceIncomeTransactionEntity;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;

public interface FinanceDiscountTransactionRepository extends BaseRepository<FinanceDiscountTransactionEntity, Long> {


    @Query("SELECT SUM (a.amount) FROM FinanceDiscountTransactionEntity a")
    BigDecimal gympinTotalDiscount();
}
