package com.notrika.gympin.common.report.service;

import com.notrika.gympin.common.report.dto.GenderCompetitionDto;
import com.notrika.gympin.common.report.dto.ReportDto;
import com.notrika.gympin.common.report.dto.ReportUseCorporateChargeDto;
import com.notrika.gympin.common.report.param.ReportParam;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

public interface ReportService  {
    ReportUseCorporateChargeDto useCorporateCharge(ReportParam param);
    Long ticketBuyCountThisWeek(ReportParam param);
    GenderCompetitionDto getGenderCompetition(ReportParam param);
}
