package com.notrika.gympin.persistence.dao.repository.settings;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.management.gifts.ManageGiftCreditEntity;
import com.notrika.gympin.persistence.entity.management.tags.ManageTagsEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface ManageGiftCreditRepository extends BaseRepository<ManageGiftCreditEntity, Long> {

    ManageGiftCreditEntity getByCodeAndDeletedIsFalse(String code);
    ManageGiftCreditEntity getByRegisterCodeAndDeletedIsFalse(String code);
}
