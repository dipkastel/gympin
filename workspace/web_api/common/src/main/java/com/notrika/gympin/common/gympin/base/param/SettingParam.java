package com.notrika.gympin.common.gympin.base.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.param.BaseParam;
import com.notrika.gympin.common.gympin.base.enums.settingsType;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class SettingParam extends BaseParam<SettingParam> {

    @JsonProperty("Key")
    private String key;

    @JsonProperty("Value")
    private String value;

    @JsonProperty("Data")
    private String data;

    @JsonProperty("Description")
    private String description;

    @JsonProperty("Type")
    private settingsType type;
}
