package com.notrika.gympin.persistence.dao.repository.place;

import com.notrika.gympin.common.purchased.purchasedSubscribe.enums.SubscribeEntryStatus;
import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.purchased.purchasedSubscribe.PurchasedSubscribeEntryRequstEntity;
import com.notrika.gympin.persistence.entity.place.hall.HallEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface PurchasedSubscribeEntryRequstRepository extends BaseRepository<PurchasedSubscribeEntryRequstEntity, Long> {

    Long countAllByRequesterAndHallAndSubscribeEntryStatusAndDeletedIsFalse(UserEntity athlete, HallEntity hall, SubscribeEntryStatus status);

    PurchasedSubscribeEntryRequstEntity findAllByReferenceIdAndDeletedIsFalse(String referenceId);

}
