package com.notrika.gympin.common.report.api;

import com.notrika.gympin.common.report.dto.*;
import com.notrika.gympin.common.report.param.ReportParam;
import com.notrika.gympin.common.report.param.ReportPlaceViewsParam;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface ReportController  {

    ResponseEntity<ReportUseCorporateChargeDto> useCorporateCharge(ReportParam param);
    ResponseEntity<Long> ticketBuyCountThisWeek(ReportParam param);
    ResponseEntity<ReportGenderCompetitionDto> getGenderCompetition(ReportParam param);
    ResponseEntity<List<ReportPopularSportDto>> getPopularSports(ReportParam param);
    ResponseEntity<List<ReportActiveUsersDto>> getActivePersonnel(ReportParam param);
    ResponseEntity<List<ReportUserEntryCountDto>> getActiveInEnterPlacePersonnel(ReportParam param);
    ResponseEntity<List<ReportCorporateTransactionsDto>> getBalanceChangedReport(ReportParam param);
    ResponseEntity<List<ReportPlaceViewsDto>> getPlaceViewsReport(@RequestBody ReportPlaceViewsParam param);
    ResponseEntity<List<String>> getAiReport(ReportParam param);

}
