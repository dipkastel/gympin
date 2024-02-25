package com.notrika.gympin.persistence.dao.repository.finance;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.finance.Increase.FinanceIncreaseUserDepositEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface FinanceIncreaseUserDepositRepository extends BaseRepository<FinanceIncreaseUserDepositEntity, Long> {
}