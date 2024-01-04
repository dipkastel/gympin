package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.settings.base.dto.SettingDto;
import com.notrika.gympin.common.settings.base.param.SettingParam;
import com.notrika.gympin.persistence.entity.management.settings.SettingsEntity;

public final class SettingsConvertor {

    public static SettingsEntity toEntity(SettingParam param) {
        SettingsEntity entity = new SettingsEntity();
        entity.setId(param.getId());
        entity.setKey(param.getKey());
        entity.setValue(param.getValue());
        entity.setType(param.getType());
        entity.setData(param.getData());
        entity.setDescription(param.getDescription());
        return entity;
    }

    public static SettingDto toDto(SettingsEntity entity) {
        SettingDto dto = new SettingDto();
        dto.setId(entity.getId());
        dto.setKey(entity.getKey());
        dto.setValue(entity.getValue());
        dto.setType(entity.getType());
        dto.setData(entity.getData());
        dto.setDescription(entity.getDescription());
        return dto;
    }

}
