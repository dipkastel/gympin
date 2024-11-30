package com.notrika.gympin.common.settings.corporateSettings.service;

import com.notrika.gympin.common.settings.corporateSettings.dto.CorporateSettingDto;
import com.notrika.gympin.common.settings.corporateSettings.param.CorporateSettingParam;
import com.notrika.gympin.common.settings.userSettings.dto.UserSettingDto;
import com.notrika.gympin.common.settings.userSettings.param.UserSettingParam;
import com.notrika.gympin.common.util._base.base.BaseService;
import com.notrika.gympin.common.util._base.query.BaseQuery;

import java.util.List;

public interface corporateSettingsService extends BaseService<CorporateSettingParam, CorporateSettingDto, BaseQuery<?>> {
    List<CorporateSettingDto> getCorporateSettings(Long corporateId);
}
