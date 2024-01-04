package com.notrika.gympin.persistence.dao.repository.finance;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.finance.user.FinanceUserEntity;

public interface FinanceUserRepository extends BaseRepository<FinanceUserEntity , Long> {

    FinanceUserEntity findByUserIdAndDeletedFalse(Long placeId);
}
