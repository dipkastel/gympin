package com.notrika.gympin.persistence.dao.repository.finance;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.finance.affiliate.FinanceAffiliatorEntity;
import com.notrika.gympin.persistence.entity.finance.user.FinanceUserEntity;

import java.util.List;

public interface FinanceAffiliateRepository extends BaseRepository<FinanceAffiliatorEntity, Long> {

    FinanceAffiliatorEntity findByUsernameAndDeletedIsFalse(String username);
}
