package com.notrika.gympin.persistence.dao.repository.finance;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.finance.corporate.FinanceCorporateEntity;

public interface FinanceCorporateRepository extends BaseRepository<FinanceCorporateEntity, Long> {


    FinanceCorporateEntity findAllByCorporateIdAndDeletedFalse(Long corporateId);
}
