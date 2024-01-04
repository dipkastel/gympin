package com.notrika.gympin.controller.impl.settings.report;

import com.notrika.gympin.common.util._base.param.BasePagedParam;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.settings.reportSettings.api.ReportSettingsController;
import com.notrika.gympin.common.settings.reportSettings.dto.ReportSettingsDto;
import com.notrika.gympin.common.settings.reportSettings.param.ReportSettingsParam;
import com.notrika.gympin.common.settings.reportSettings.service.ReportSettingsService;
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
