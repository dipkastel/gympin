package com.notrika.gympin.persistence.dao.repository.purchased.subscribe;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.purchased.purchasedSubscribe.PurchasedSubscribeMessageEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface PurchasedSubscribeEntryMessageRepository extends BaseRepository<PurchasedSubscribeMessageEntity, Long> {
}
