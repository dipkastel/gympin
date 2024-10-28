package com.notrika.gympin.persistence.dao.repository.finance.transaction;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.corporate.CorporatePersonnelEntity;
import com.notrika.gympin.persistence.entity.finance.transactions.FinanceCorporateTransactionEntity;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;

public interface FinanceCorporateTransactionRepository extends BaseRepository<FinanceCorporateTransactionEntity, Long> {

    @Query("SELECT SUM(f.amount) FROM FinanceCorporateTransactionEntity f  WHERE f.transactionCorporateType LIKE 'DEPOSIT' AND f.amount > 0 AND f.transactionStatus LIKE 'COMPLETE' and f.financeCorporate.id = :#{#financeCorporateId} ")
    BigDecimal getCorporateTotalIncreases(Long financeCorporateId);

}
