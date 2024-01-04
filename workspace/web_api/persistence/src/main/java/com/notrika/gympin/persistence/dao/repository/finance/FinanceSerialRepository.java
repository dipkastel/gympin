package com.notrika.gympin.persistence.dao.repository.finance;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.finance.FinanceSerialEntity;

public interface FinanceSerialRepository extends BaseRepository<FinanceSerialEntity, Long> {

    FinanceSerialEntity findBySerialAndDeletedIsFalse(String serial);
}
