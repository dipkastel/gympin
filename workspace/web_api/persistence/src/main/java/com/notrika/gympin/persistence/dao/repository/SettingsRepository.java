package com.notrika.gympin.persistence.dao.repository;


import com.notrika.gympin.common.gympin.base.enums.settingsType;
import com.notrika.gympin.persistence.entity.settings.SettingsEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SettingsRepository extends BaseRepository<SettingsEntity, Long> {
    List<SettingsEntity> findAllByDeletedIsFalseAndType(settingsType type);
}
