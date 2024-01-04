package com.notrika.gympin.common.settings.base.api;

import com.notrika.gympin.common.util._base.base.BaseController;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.settings.base.dto.SettingDto;
import com.notrika.gympin.common.settings.base.enums.settingsType;
import com.notrika.gympin.common.settings.base.param.SettingParam;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface SettingsController  extends BaseController<SettingParam, SettingDto, BaseQuery<?>> {
    ResponseEntity<List<SettingDto>> getSettingsByType(settingsType type);



}
