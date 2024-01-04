package com.notrika.gympin.persistence.dao.repository.finance;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.finance.user.FinanceUserTransactionEntity;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;

public interface FinanceUserTransactionRepository extends BaseRepository<FinanceUserTransactionEntity, Long> {

    @Query("SELECT SUM (b.amount) FROM FinanceUserTransactionEntity b where b.transactionType = 'BENEFICIARY' ")
    BigDecimal getPayableBENEFIT();

}
