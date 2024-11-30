package com.notrika.gympin.common.settings.corporateSettings.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.corporate.corporate.dto.CorporateDto;
import com.notrika.gympin.common.settings.corporateSettings.enums.CorporateSettingTypesEnum;
import com.notrika.gympin.common.util._base.dto.BaseDto;
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
public class CorporateSettingDto extends BaseDto<CorporateSettingDto> {

    @JsonProperty("Corporate")
    private CorporateDto corporate;

    @JsonProperty("Key")
    private CorporateSettingTypesEnum key;

    @JsonProperty("Value")
    private String value;

    @JsonProperty("Data")
    private String data;

    @JsonProperty("Description")
    private String description;
}
