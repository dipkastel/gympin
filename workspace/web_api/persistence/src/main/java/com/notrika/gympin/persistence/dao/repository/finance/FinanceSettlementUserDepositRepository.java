package com.notrika.gympin.persistence.dao.repository.finance;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.finance.Increase.FinanceIncreaseUserDepositEntity;
import com.notrika.gympin.persistence.entity.finance.settlement.FinanceSettlementUserDepositEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface FinanceSettlementUserDepositRepository extends BaseRepository<FinanceSettlementUserDepositEntity, Long> {
}
