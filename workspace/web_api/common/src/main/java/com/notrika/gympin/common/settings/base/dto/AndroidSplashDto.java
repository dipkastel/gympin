package com.notrika.gympin.common.settings.base.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.settings.userSettings.dto.UserSettingDto;
import com.notrika.gympin.common.util._base.dto.BaseDto;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class AndroidSplashDto extends BaseDto<AndroidSplashDto> {

    @JsonProperty("Settings")
    private List<SettingDto> settings;

    @JsonProperty("UserSettings")
    private List<UserSettingDto> userSettings;
}
