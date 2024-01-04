package com.notrika.gympin.persistence.dao.repository.settings;


import com.notrika.gympin.common.settings.base.enums.settingsType;
import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.management.settings.SettingsEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ManageSettingsRepository extends BaseRepository<SettingsEntity, Long> {
    List<SettingsEntity> findAllByDeletedIsFalseAndType(settingsType type);
    SettingsEntity findByKeyAndDeletedFalse(String key);
}
