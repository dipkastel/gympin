package com.notrika.gympin.persistence.dao.repository.finance.transaction;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.finance.BaseTransactionEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface FinanceTransactionBaseRepository extends BaseRepository<BaseTransactionEntity, Long> {
}
