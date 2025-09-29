package com.notrika.gympin.persistence.dao.repository.finance.request;

import com.notrika.gympin.common.finance.IncreaseUserDeposit.enums.DepositStatus;
import com.notrika.gympin.common.finance.transaction.enums.GatewayType;
import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.finance.FinanceSerialEntity;
import com.notrika.gympin.persistence.entity.finance.user.requests.FinanceIncreaseUserDepositRequestEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FinanceIncreaseUserDepositRequestRepository extends BaseRepository<FinanceIncreaseUserDepositRequestEntity, Long> {


    List<FinanceIncreaseUserDepositRequestEntity> findAllByDeletedIsFalseAndGatewayTypeAndDepositStatus(GatewayType getwayType, DepositStatus status);
}
