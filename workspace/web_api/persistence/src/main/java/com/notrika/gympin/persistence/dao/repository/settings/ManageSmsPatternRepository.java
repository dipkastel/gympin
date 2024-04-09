package com.notrika.gympin.persistence.dao.repository.settings;


import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.management.settings.SettingsEntity;
import com.notrika.gympin.persistence.entity.management.sms.ManageSmsEntity;
import com.notrika.gympin.persistence.entity.management.sms.ManageSmsPatternEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface ManageSmsPatternRepository extends BaseRepository<ManageSmsPatternEntity, Long> {

    ManageSmsPatternEntity findByPatternKeyAndDeletedFalse(String key);

}
