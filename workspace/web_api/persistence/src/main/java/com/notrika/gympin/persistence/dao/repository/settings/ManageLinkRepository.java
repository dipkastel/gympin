package com.notrika.gympin.persistence.dao.repository.settings;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.management.gifts.ManageGiftCreditEntity;
import org.springframework.stereotype.Repository;
import com.notrika.gympin.persistence.entity.management.links.ManageLinkEntity;

@Repository
public interface ManageLinkRepository extends BaseRepository<ManageLinkEntity, Long> {

    ManageLinkEntity getByCodeAndDeletedIsFalse(String code);
}
