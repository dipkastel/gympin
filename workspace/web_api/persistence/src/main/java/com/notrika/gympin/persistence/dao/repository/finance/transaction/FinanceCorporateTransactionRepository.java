package com.notrika.gympin.persistence.dao.repository.finance.transaction;

import com.notrika.gympin.common.report.dto.ReportUseCorporateChargeDto;
import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.corporate.CorporatePersonnelEntity;
import com.notrika.gympin.persistence.entity.finance.transactions.FinanceCorporateTransactionEntity;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;

public interface FinanceCorporateTransactionRepository extends BaseRepository<FinanceCorporateTransactionEntity, Long> {

    @Query("SELECT SUM(f.amount) FROM FinanceCorporateTransactionEntity f  WHERE f.transactionCorporateType LIKE 'DEPOSIT' AND f.amount > 0 AND f.transactionStatus LIKE 'COMPLETE' and f.financeCorporate.id = :#{#financeCorporateId} ")
    BigDecimal getCorporateTotalIncreases(Long financeCorporateId);

    @Query(value = "SELECT Pmonth(ft.create_date)+(pyear(ft.create_date)*100) as ym , CONCAT(pyear(MIN(ft.create_date)),\" \",pmonthname(MIN(ft.create_date))) as monthName,SUM(ft.amount) as amount FROM finance_corporate_transaction fct LEFT JOIN finance_transaction ft ON ft.id = fct.id WHERE fct.type = 'DEPOSIT' AND ft.amount < 0 AND fct.finance_corporate_id = :financeCorporateId GROUP BY ym", nativeQuery = true)
    List<Object[]> getReportUseCorporateCharge(Long financeCorporateId);

}
