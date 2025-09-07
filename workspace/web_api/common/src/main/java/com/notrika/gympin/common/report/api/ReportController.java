package com.notrika.gympin.common.report.api;

import com.notrika.gympin.common.report.dto.GenderCompetitionDto;
import com.notrika.gympin.common.report.dto.PopularSportDto;
import com.notrika.gympin.common.report.dto.ReportDto;
import com.notrika.gympin.common.report.dto.ReportUseCorporateChargeDto;
import com.notrika.gympin.common.report.param.ReportParam;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface ReportController  {

    ResponseEntity<ReportUseCorporateChargeDto> useCorporateCharge(ReportParam param);
    ResponseEntity<Long> ticketBuyCountThisWeek(ReportParam param);
    ResponseEntity<GenderCompetitionDto> getGenderCompetition(ReportParam param);
    ResponseEntity<List<PopularSportDto>> getPopularSports(ReportParam param);

}
