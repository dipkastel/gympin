package com.notrika.gympin.persistence.dao.repository.purchased.subscribe;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.purchased.purchasedSubscribe.PurchasedSubscribeEntryRequstEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface PurchasedSubscribeEntryRequstRepository extends BaseRepository<PurchasedSubscribeEntryRequstEntity, Long> {

    PurchasedSubscribeEntryRequstEntity findAllByReferenceIdAndDeletedIsFalse(String referenceId);

}
