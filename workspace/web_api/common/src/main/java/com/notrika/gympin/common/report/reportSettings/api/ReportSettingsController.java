package com.notrika.gympin.common.report.reportSettings.api;

import com.notrika.gympin.common._base.base.BaseController;
import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
import com.notrika.gympin.common.report.reportSettings.dto.ReportSettingsDto;
import com.notrika.gympin.common.report.reportSettings.param.ReportSettingsParam;
import com.notrika.gympin.common.sport.dto.SportDto;
import com.notrika.gympin.common.sport.param.SportParam;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ReportSettingsController extends BaseController<ReportSettingsParam, ReportSettingsDto, BaseQuery<?>> {


}
