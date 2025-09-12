package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.settings.service.dto.ServiceDto;
import com.notrika.gympin.persistence.entity.management.service.ManageServiceExecutionEntity;
import com.notrika.gympin.persistence.entity.management.service.reportDto.ManageServiceExecutionSimpleDto;

import java.util.List;
import java.util.stream.Collectors;

public final class ServiceConvertor {

    public static ServiceDto ToDto(ManageServiceExecutionEntity entity) {
        if (entity == null) return null;
        ServiceDto dto = new ServiceDto();
        dto.setId(entity.getId());
        dto.setService(entity.getService());
        dto.setDto(entity.getDto());
        dto.setExecutionDate(entity.getExecutionDate());
        dto.setParam(entity.getParam());
        dto.setExecutorUser(UserConvertor.toDtoSimple(entity.getExecutorUser()));
        return dto;
    }

    public static List<ServiceDto> ToDtos(List<ManageServiceExecutionSimpleDto> entities) {
       return entities.stream().map(e->ToDto(e)).collect(Collectors.toList());
    }

    private static ServiceDto ToDto(ManageServiceExecutionSimpleDto entity) {
        if (entity == null) return null;
        ServiceDto dto = new ServiceDto();
        dto.setId(entity.getId());
        dto.setExecutionDate(entity.getExecutionDate());
        dto.setExecutorUser(UserConvertor.toDtoSimple(entity.getExecutorUser()));
        return dto;
    }
}
