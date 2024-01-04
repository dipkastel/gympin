package com.notrika.gympin.persistence.dao.repository.finance;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.finance.corporate.FinanceCorporateTransactionEntity;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;

public interface FinanceCorporateTransactionRepository extends BaseRepository<FinanceCorporateTransactionEntity, Long> {
    List<FinanceCorporateTransactionEntity> findAllByCorporatePersonnelIdAndDeletedIsFalse(Long personnelId);
}
