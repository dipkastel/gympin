package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.report.dto.ReportActiveUsersDto;
import com.notrika.gympin.common.report.dto.ReportCorporateTransactionsDto;
import com.notrika.gympin.common.report.dto.ReportPopularSportDto;
import com.notrika.gympin.common.report.dto.ReportUserEntryCountDto;
import com.notrika.gympin.persistence.entity.management.service.reportDto.ActiveUsersQueryDto;
import com.notrika.gympin.persistence.entity.management.service.reportDto.FinanceCorporateDepositReportDto;
import com.notrika.gympin.persistence.entity.management.service.reportDto.PopularSportRequestDto;
import com.notrika.gympin.persistence.entity.management.service.reportDto.UserEnterRequestDto;

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
    public static ReportCorporateTransactionsDto toDto(FinanceCorporateDepositReportDto entity) {
        if (entity == null) return null;
        ReportCorporateTransactionsDto dto = new ReportCorporateTransactionsDto();
        dto.setSerial(entity.getSerial().split("-")[entity.getSerial().split("-").length-1]);
        dto.setAmount(entity.getAmount());
        dto.setLatestBalance(entity.getLatestBalance());
        dto.setDate(entity.getDate());
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
