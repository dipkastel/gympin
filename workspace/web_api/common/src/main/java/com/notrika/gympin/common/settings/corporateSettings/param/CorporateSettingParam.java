package com.notrika.gympin.common.settings.corporateSettings.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.corporate.corporate.param.CorporateParam;
import com.notrika.gympin.common.settings.corporateSettings.enums.CorporateSettingTypesEnum;
import com.notrika.gympin.common.util._base.param.BaseParam;
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
public class CorporateSettingParam extends BaseParam<CorporateSettingParam> {

    @JsonProperty("Corporate")
    private CorporateParam corporate;

    @JsonProperty("Key")
    private CorporateSettingTypesEnum key;

    @JsonProperty("Value")
    private String value;

    @JsonProperty("Data")
    private String data;

    @JsonProperty("Description")
    private String description;

}
