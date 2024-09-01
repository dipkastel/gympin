package com.notrika.gympin.persistence.dao.repository.finance.request;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.finance.user.requests.FinanceSettlementUserDepositRequestEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FinanceSettlementUserDepositRequestRepository extends BaseRepository<FinanceSettlementUserDepositRequestEntity, Long> {

    @Query("select R from FinanceSettlementUserDepositRequestEntity R where R.financeUser.user.id =:#{#userId} and R.deleted=false")
    List<FinanceSettlementUserDepositRequestEntity> getAllUserRequest(Long userId);

}
