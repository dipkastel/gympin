package com.notrika.gympin.persistence.dao.repository.finance.gateway;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.finance.gateway.FinancePaymentSuggestEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface FinancePaymentSuggestRepository extends BaseRepository<FinancePaymentSuggestEntity, Long> {
}
