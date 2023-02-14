package com.notrika.gympin.common.gympin.base.api;

import com.notrika.gympin.common._base.base.BaseController;
import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common.gympin.base.dto.SettingDto;
import com.notrika.gympin.common.gympin.base.enums.settingsType;
import com.notrika.gympin.common.gympin.base.param.SettingParam;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface SettingsController  extends BaseController<SettingParam, SettingDto, BaseQuery<?>> {
    ResponseEntity<List<SettingDto>> getSettingsByType(settingsType type);



}
