package com.notrika.gympin.persistence.dao.repository.purchased;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.purchased.PurchasedBaseEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface PurchasedRepository extends BaseRepository<PurchasedBaseEntity, Long> {
}
