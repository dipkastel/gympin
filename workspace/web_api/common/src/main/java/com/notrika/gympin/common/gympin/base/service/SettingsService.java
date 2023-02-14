package com.notrika.gympin.common.gympin.base.service;

import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common._base.base.BaseService;
import com.notrika.gympin.common.gympin.base.dto.SettingDto;
import com.notrika.gympin.common.gympin.base.enums.settingsType;
import com.notrika.gympin.common.gympin.base.param.SettingParam;

import java.util.List;

public interface SettingsService extends BaseService<SettingParam, SettingDto, BaseQuery<?>> {

    List<SettingDto> getByType(settingsType type);
}
