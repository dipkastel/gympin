package com.notrika.gympin.common.report.service;

import com.notrika.gympin.common.report.dto.*;
import com.notrika.gympin.common.report.param.ReportParam;
import com.notrika.gympin.common.report.param.ReportPlaceViewsParam;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ReportService  {
    ReportUseCorporateChargeDto useCorporateCharge(ReportParam param);
    Long ticketBuyCountThisWeek(ReportParam param);
    ReportGenderCompetitionDto getGenderCompetition(ReportParam param);
    List<ReportPopularSportDto> getPopularSports(ReportParam param);
    List<ReportActiveUsersDto> getActiveUsers(ReportParam param);
    List<ReportUserEntryCountDto> getActiveInEnterPlacePersonnel(ReportParam param);
    List<ReportCorporateTransactionsDto> getBalanceChangedReport(ReportParam param);
    List<ReportPlaceViewsDto> getPlaceViewsReport(ReportPlaceViewsParam param);
    List<String> getAiReport(ReportParam param);
}
