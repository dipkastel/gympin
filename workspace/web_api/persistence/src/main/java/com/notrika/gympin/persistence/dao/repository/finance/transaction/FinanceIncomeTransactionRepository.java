package com.notrika.gympin.persistence.dao.repository.finance.transaction;

import com.notrika.gympin.persistence.entity.finance.transactions.MonthIncomeQDto;
import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.finance.transactions.gympin.FinanceIncomeTransactionEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;

public interface FinanceIncomeTransactionRepository extends BaseRepository<FinanceIncomeTransactionEntity, Long> {


    @Query("SELECT SUM (a.amount) FROM FinanceIncomeTransactionEntity a")
    BigDecimal gympinTotalIncome();


    @Query(value = "SELECT Sum(ft.amount), pmonthname(ft.create_date) FROM finance_income_transaction fit JOIN finance_transaction ft on ft.id = fit.id GROUP BY pmonthname(ft.create_date)  order by Max(ft.id)",nativeQuery = true)
    List<Object[]> getByMonth();
}
