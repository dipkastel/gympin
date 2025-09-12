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

    @Query("SELECT SUM(f.amount) FROM FinanceCorporateTransactionEntity f  " +
            "WHERE f.transactionCorporateType LIKE com.notrika.gympin.common.finance.transaction.enums.TransactionCorporateType.DEPOSIT " +
            "AND f.amount > 0 " +
            "AND f.transactionStatus LIKE com.notrika.gympin.common.finance.transaction.enums.TransactionStatus.COMPLETE " +
            "and f.serial.processTypeEnum LIKE com.notrika.gympin.common.finance.serial.enums.ProcessTypeEnum.CASH_IN_ACCOUNT_CHARGE_CORPORATE " +
            "and f.financeCorporate.id = :#{#financeCorporateId} ")
    BigDecimal getCorporateTotalIncreases(Long financeCorporateId);



}
