package com.notrika.gympin.controller.impl.report;

import com.notrika.gympin.common.report.api.ReportController;
import com.notrika.gympin.common.report.dto.GenderCompetitionDto;
import com.notrika.gympin.common.report.dto.ReportUseCorporateChargeDto;
import com.notrika.gympin.common.report.param.ReportParam;
import com.notrika.gympin.common.report.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public ResponseEntity<GenderCompetitionDto> getGenderCompetition(ReportParam param){
        return ResponseEntity.ok(reportService.getGenderCompetition(param));
    }

}
