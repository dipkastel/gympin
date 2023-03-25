package com.notrika.gympin.common.report.reportSettings.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.dto.BaseDtoWithCreateUpdate;
import com.notrika.gympin.common._base.param.BaseParam;
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
public class ReportSettingsParam extends BaseParam<ReportSettingsParam> {

    @JsonProperty("Key")
    private String key;

    @JsonProperty("Value")
    private String value;

    @JsonProperty("Description")
    private String description;

    @JsonProperty("UpdateAuto")
    private Boolean updateAuto;

}
