package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.report.dto.PopularSportDto;
import com.notrika.gympin.persistence.entity.management.service.PopularSportRequestDto;

public final class ReportConvertor {


    public static PopularSportDto toDto(PopularSportRequestDto entity) {
        if (entity == null) return null;
        PopularSportDto dto = new PopularSportDto();
        dto.setSportName(entity.getSportName());
        dto.setSportCount(entity.getCount());
        return dto;
    }

}
