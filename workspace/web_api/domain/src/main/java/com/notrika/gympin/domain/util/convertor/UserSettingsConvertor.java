package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.settings.userSettings.dto.UserSettingDto;
import com.notrika.gympin.persistence.entity.management.settings.UserSettingsEntity;

public final class UserSettingsConvertor {

    public static UserSettingDto toDto(UserSettingsEntity entity) {
        UserSettingDto dto = new UserSettingDto();
        dto.setId(entity.getId());
        dto.setKey(entity.getKey());
        dto.setValue(entity.getValue());
        dto.setData(entity.getData());
        dto.setDescription(entity.getDescription());
        dto.setUser(UserConvertor.toDtoSimple(entity.getUser()));
        return dto;
    }

}
