package com.notrika.gympin.common.settings.base.service;

import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.util._base.base.BaseService;
import com.notrika.gympin.common.settings.base.dto.SettingDto;
import com.notrika.gympin.common.settings.base.enums.settingsType;
import com.notrika.gympin.common.settings.base.param.SettingParam;

import java.util.List;

public interface SettingsService extends BaseService<SettingParam, SettingDto, BaseQuery<?>> {

    List<SettingDto> getByType(settingsType type);
    SettingDto getByKey(String Key);
}
