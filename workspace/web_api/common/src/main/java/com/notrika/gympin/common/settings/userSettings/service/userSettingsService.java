package com.notrika.gympin.common.settings.userSettings.service;

import com.notrika.gympin.common.settings.sms.dto.SmsDto;
import com.notrika.gympin.common.settings.sms.param.SmsParam;
import com.notrika.gympin.common.settings.sms.query.SmsQuery;
import com.notrika.gympin.common.settings.userSettings.dto.UserSettingDto;
import com.notrika.gympin.common.settings.userSettings.param.UserSettingParam;
import com.notrika.gympin.common.util._base.base.BaseService;
import com.notrika.gympin.common.util._base.query.BaseQuery;

import java.util.List;

public interface userSettingsService extends BaseService<UserSettingParam, UserSettingDto, BaseQuery<?>> {
    List<UserSettingDto> getUserSettings(Long userId);
}
