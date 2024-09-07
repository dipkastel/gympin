package com.notrika.gympin.persistence.dao.repository.finance;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.finance.user.FinanceUserEntity;

import java.util.List;

public interface FinanceUserRepository extends BaseRepository<FinanceUserEntity , Long> {

    List<FinanceUserEntity> findByUserIdAndDeletedFalse(Long placeId);
}
