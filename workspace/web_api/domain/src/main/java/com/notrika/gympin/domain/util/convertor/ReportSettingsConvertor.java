package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.context.GympinContext;
import com.notrika.gympin.common.context.GympinContextHolder;
import com.notrika.gympin.common.plan.dto.PlanDto;
import com.notrika.gympin.common.plan.dto.PlanGateTimingDto;
import com.notrika.gympin.common.plan.dto.PlanRegisterDto;
import com.notrika.gympin.common.plan.param.PlanRegisterParam;
import com.notrika.gympin.common.report.reportSettings.dto.ReportSettingsDto;
import com.notrika.gympin.domain.util.helper.GeneralHelper;
import com.notrika.gympin.persistence.entity.plan.PlanEntity;
import com.notrika.gympin.persistence.entity.plan.PlanGateTimingEntity;
import com.notrika.gympin.persistence.entity.plan.PlanRegisterEntity;
import com.notrika.gympin.persistence.entity.settings.ReportSettingsEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;

import java.util.Calendar;
import java.util.Date;

public class ReportSettingsConvertor {

    public static ReportSettingsDto toDto(ReportSettingsEntity entity) {
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
