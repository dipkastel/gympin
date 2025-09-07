package com.notrika.gympin.persistence.dao.repository.finance.transaction;

import com.notrika.gympin.common.report.dto.ReportUseCorporateChargeDto;
import com.notrika.gympin.common.user.user.enums.Gender;
import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.corporate.CorporatePersonnelEntity;
import com.notrika.gympin.persistence.entity.finance.transactions.FinanceCorporateTransactionEntity;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Objects;

public interface FinanceCorporateTransactionRepository extends BaseRepository<FinanceCorporateTransactionEntity, Long> {

    @Query("SELECT SUM(f.amount) FROM FinanceCorporateTransactionEntity f  WHERE f.transactionCorporateType LIKE 'DEPOSIT' AND f.amount > 0 AND f.transactionStatus LIKE 'COMPLETE' and f.financeCorporate.id = :#{#financeCorporateId} ")
    BigDecimal getCorporateTotalIncreases(Long financeCorporateId);

    @Query(value = "SELECT Pmonth(ft.create_date)+(pyear(ft.create_date)*100) as ym , CONCAT(pyear(MIN(ft.create_date)),\" \",pmonthname(MIN(ft.create_date))) as monthName,SUM(ft.amount) as amount FROM finance_corporate_transaction fct LEFT JOIN finance_transaction ft ON ft.id = fct.id join invoice inv on fct.serial_id = inv.serial_id WHERE inv.status like 'COMPLETED' AND fct.type = 'DEPOSIT' AND ft.amount < 0 AND fct.finance_corporate_id = :financeCorporateId GROUP BY ym", nativeQuery = true)
    List<Object[]> getReportUseCorporateCharge(Long financeCorporateId);

    @Query(value = "SELECT COUNT(*) AS total FROM purchased_base pb JOIN purchased_subscribe ps ON pb.id = ps.id JOIN corporate_personel cp ON pb.customer_user_id = cp.personnel_user_id WHERE cp.corporate_id = :corporateId AND ps.status IN ('ACTIVE', 'COMPLETE') AND pb.create_date >= NOW() - INTERVAL 7 DAY", nativeQuery = true)
    Long getTicketBuyThisWeekByCorporateId(Long corporateId);


    @Query(value = "SELECT COUNT(DISTINCT u.id) as Count  FROM invoice i  JOIN finance_serial fs ON i.serial_id = fs.id  JOIN finance_corporate_transaction fct ON fct.serial_id = fs.id  JOIN finance_corporate fc ON fc.id = fct.finance_corporate_id  JOIN `user` u ON u.id = i.user_id  WHERE fc.corporate_id = :corporateId   AND i.status = 'COMPLETED'   AND fct.type = 'DEPOSIT'   AND fs.create_date >= DATE_SUB(CURDATE(), INTERVAL :intervalMonthCount MONTH)   AND u.gender = :gender ", nativeQuery = true)
    Long getTicketBuyByDateThisWeekByGenderAndCorporateId(Integer intervalMonthCount, String gender, Long corporateId);

}
