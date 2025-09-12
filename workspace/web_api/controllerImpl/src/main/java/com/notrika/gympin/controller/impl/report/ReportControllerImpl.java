package com.notrika.gympin.controller.impl.report;

import com.notrika.gympin.common.report.api.ReportController;
import com.notrika.gympin.common.report.dto.*;
import com.notrika.gympin.common.report.param.ReportParam;
import com.notrika.gympin.common.report.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/report")
public class ReportControllerImpl implements ReportController {


    @Autowired
    ReportService reportService;


    @Override
    @GetMapping("/useCorporateCharge")
    public ResponseEntity<ReportUseCorporateChargeDto> useCorporateCharge(ReportParam param){
        return ResponseEntity.ok(reportService.useCorporateCharge(param));
    }

    @Override
    @GetMapping("/ticketBuyCountThisWeek")
    public ResponseEntity<Long> ticketBuyCountThisWeek(ReportParam param){
        return ResponseEntity.ok(reportService.ticketBuyCountThisWeek(param));
    }

    @Override
    @GetMapping("/getGenderCompetition")
    public ResponseEntity<ReportGenderCompetitionDto> getGenderCompetition(ReportParam param){
        return ResponseEntity.ok(reportService.getGenderCompetition(param));
    }

    @Override
    @GetMapping("/getPopularSports")
    public ResponseEntity<List<ReportPopularSportDto>> getPopularSports(ReportParam param){
        return ResponseEntity.ok(reportService.getPopularSports(param));
    }

    @Override
    @GetMapping("/getActivePersonnel")
    public ResponseEntity<List<ReportActiveUsersDto>> getActivePersonnel(ReportParam param) {
        return ResponseEntity.ok(reportService.getActiveUsers(param));
    }

    @Override
    @GetMapping("/getActiveInEnterPlacePersonnel")
    public ResponseEntity<List<ReportUserEntryCountDto>> getActiveInEnterPlacePersonnel(ReportParam param) {
        return ResponseEntity.ok(reportService.getActiveInEnterPlacePersonnel(param));
    }

    @Override
    @GetMapping("getBalanceChangedReport")
    public ResponseEntity<List<ReportCorporateTransactionsDto>> getBalanceChangedReport(ReportParam param) {
        return ResponseEntity.ok(reportService.getBalanceChangedReport(param));
    }

    @Override
    @GetMapping("getAiReport")
    public ResponseEntity<List<String>> getAiReport(ReportParam param) {
        return ResponseEntity.ok(reportService.getAiReport(param));
    }

}
