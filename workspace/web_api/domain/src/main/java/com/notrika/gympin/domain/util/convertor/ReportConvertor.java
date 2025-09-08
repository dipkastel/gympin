package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.report.dto.ReportActiveUsersDto;
import com.notrika.gympin.common.report.dto.ReportPopularSportDto;
import com.notrika.gympin.common.report.dto.ReportUserEntryCountDto;
import com.notrika.gympin.persistence.entity.management.service.ActiveUsersQueryDto;
import com.notrika.gympin.persistence.entity.management.service.PopularSportRequestDto;
import com.notrika.gympin.persistence.entity.management.service.UserEnterRequestDto;

public final class ReportConvertor {


    public static ReportPopularSportDto toDto(PopularSportRequestDto entity) {
        if (entity == null) return null;
        ReportPopularSportDto dto = new ReportPopularSportDto();
        dto.setSportName(entity.getSportName());
        dto.setSportCount(entity.getCount());
        return dto;
    }

    public static ReportActiveUsersDto toDto(ActiveUsersQueryDto entity) {
        if (entity == null) return null;
        ReportActiveUsersDto dto = new ReportActiveUsersDto();
        dto.setUserName(entity.getUserName());
        dto.setUser(UserConvertor.toDtoSimple(entity.getUser()));
        dto.setPersonnelId(entity.getPersonnelId());
        dto.setActivityCount(entity.getActivityCount());
        return dto;
    }
    public static ReportUserEntryCountDto toDto(UserEnterRequestDto entity) {
        if (entity == null) return null;
        ReportUserEntryCountDto dto = new ReportUserEntryCountDto();
        dto.setUser(UserConvertor.toDtoSimple(entity.getUser()));
        dto.setPersonnelId(entity.getPersonnelId());
        dto.setEnterCount(entity.getCount());
        return dto;
    }

}
