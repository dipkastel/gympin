package com.notrika.gympin.common.settings.base.api;

import com.notrika.gympin.common.settings.base.dto.CallListDto;
import com.notrika.gympin.common.settings.base.param.CallToNumberParam;
import com.notrika.gympin.common.settings.base.param.GetCallListParam;
import com.notrika.gympin.common.settings.base.param.SettingProfitParam;
import com.notrika.gympin.common.util._base.base.BaseController;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.settings.base.dto.SettingDto;
import com.notrika.gympin.common.settings.base.enums.settingsType;
import com.notrika.gympin.common.settings.base.param.SettingParam;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface SettingsController  extends BaseController<SettingParam, SettingDto, BaseQuery<?>> {
    ResponseEntity<List<SettingDto>> getSettingsByType(settingsType type);
    ResponseEntity<Boolean> DoMaximumDiscount();
    ResponseEntity<Boolean> DoMaximumManagedDiscount(@RequestBody SettingProfitParam profit);
    ResponseEntity<Boolean> RemoveAllDiscounts();
    ResponseEntity<Boolean> SetAutoToAll();
    ResponseEntity<Boolean> UpdateAutoDiscount();
    ResponseEntity<String> callToNumber(@RequestBody CallToNumberParam param);
    ResponseEntity<CallListDto> getCallList(@RequestBody GetCallListParam param);
}
