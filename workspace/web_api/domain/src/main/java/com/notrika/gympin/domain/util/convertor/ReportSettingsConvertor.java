package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.settings.reportSettings.dto.ReportSettingsDto;
import com.notrika.gympin.persistence.entity.management.settings.ManageReportSettingsEntity;

public class ReportSettingsConvertor {

    public static ReportSettingsDto toDto(ManageReportSettingsEntity entity) {
        ReportSettingsDto dto = new ReportSettingsDto();
        dto.setId(entity.getId());
        dto.setValue(entity.getValue());
        dto.setKey(entity.getKey());
        dto.setDescription(entity.getDescription());
        dto.setUpdateAuto(entity.getUpdateAuto());
        dto.setUpdatedDate(entity.getUpdatedDate());
        return dto;
    }

}
