package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.settings.corporateSettings.dto.CorporateSettingDto;
import com.notrika.gympin.persistence.entity.management.settings.CorporateSettingsEntity;

public final class CorporateSettingsConvertor {

    public static CorporateSettingDto toDto(CorporateSettingsEntity entity) {
        CorporateSettingDto dto = new CorporateSettingDto();
        dto.setId(entity.getId());
        dto.setKey(entity.getKey());
        dto.setValue(entity.getValue());
        dto.setData(entity.getData());
        dto.setDescription(entity.getDescription());
        dto.setCorporate(CorporateConvertor.toDto(entity.getCorporate()));
        return dto;
    }

}
