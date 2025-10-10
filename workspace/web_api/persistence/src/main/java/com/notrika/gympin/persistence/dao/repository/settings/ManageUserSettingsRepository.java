package com.notrika.gympin.persistence.dao.repository.settings;


import com.notrika.gympin.common.settings.base.enums.settingsType;
import com.notrika.gympin.common.settings.userSettings.enums.UserSettingTypesEnum;
import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.management.settings.SettingsEntity;
import com.notrika.gympin.persistence.entity.management.settings.UserSettingsEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ManageUserSettingsRepository extends BaseRepository<UserSettingsEntity, Long> {

    List<UserSettingsEntity> findAllByDeletedIsFalseAndUserId(Long userId);
    List<UserSettingsEntity> findAllByDeletedIsFalseAndUserIdAndKey(Long userId, UserSettingTypesEnum key);
    List<UserSettingsEntity> findAllByDeletedIsFalseAndUserIdAndKeyAndDataLike(Long userId, UserSettingTypesEnum key,String Data);
}
