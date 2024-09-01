package com.notrika.gympin.persistence.dao.repository.finance.request;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.finance.user.requests.FinanceIncreaseUserDepositRequestEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface FinanceIncreaseUserDepositRequestRepository extends BaseRepository<FinanceIncreaseUserDepositRequestEntity, Long> {
}
