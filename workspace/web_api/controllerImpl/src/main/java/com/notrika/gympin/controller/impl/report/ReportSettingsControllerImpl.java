package com.notrika.gympin.controller.impl.report;

import com.notrika.gympin.common._base.param.BasePagedParam;
import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common.plan.api.PlanRegisterController;
import com.notrika.gympin.common.plan.dto.PlanRegisterDto;
import com.notrika.gympin.common.plan.param.PlanRegisterParam;
import com.notrika.gympin.common.plan.service.PlanRegisterService;
import com.notrika.gympin.common.report.reportSettings.api.ReportSettingsController;
import com.notrika.gympin.common.report.reportSettings.dto.ReportSettingsDto;
import com.notrika.gympin.common.report.reportSettings.param.ReportSettingsParam;
import com.notrika.gympin.common.report.reportSettings.service.ReportSettingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/reportSettings")
public class ReportSettingsControllerImpl implements ReportSettingsController {

    @Autowired
    private ReportSettingsService reportSettingsService;


    @Override
    public ResponseEntity<ReportSettingsDto> add(ReportSettingsParam reportSettingsParam) {
        return ResponseEntity.ok(reportSettingsService.add(reportSettingsParam));
    }

    @Override
    public ResponseEntity<ReportSettingsDto> update(ReportSettingsParam reportSettingsParam) {
        return ResponseEntity.ok(reportSettingsService.update(reportSettingsParam));
    }

    @Override
    public ResponseEntity<ReportSettingsDto> delete(ReportSettingsParam reportSettingsParam) {
        return ResponseEntity.ok(reportSettingsService.delete(reportSettingsParam));
    }

    @Override
    public ResponseEntity<List<ReportSettingsDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(reportSettingsService.getAll(pagingParam));
    }

    @Override
    public ResponseEntity<ReportSettingsDto> getById(Long id) {
        return ResponseEntity.ok(reportSettingsService.getById(id));
    }

    @Override
    public ResponseEntity<Page<ReportSettingsDto>> query(BaseQuery<?> param) {
        return ResponseEntity.ok(reportSettingsService.query(param));
    }
}
