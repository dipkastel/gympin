package com.notrika.gympin.persistence.dao.repository.finance;

import com.notrika.gympin.common.user.user.enums.UserFinanceType;
import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.finance.user.FinanceUserEntity;

import java.math.BigDecimal;
import java.util.List;

public interface FinanceUserRepository extends BaseRepository<FinanceUserEntity , Long> {

    List<FinanceUserEntity> findByUserIdAndDeletedFalse(Long placeId);
    List<FinanceUserEntity> findByDeletedIsFalseAndUserFinanceTypeAndTotalDepositIsGreaterThan(UserFinanceType type, BigDecimal minDeposit);
}
