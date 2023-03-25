package com.notrika.gympin.common.report.reportSettings.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.dto.BaseDtoWithCreateUpdate;
import com.notrika.gympin.common.sport.enums.LaunchStatus;
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
public class ReportSettingsDto extends BaseDtoWithCreateUpdate<ReportSettingsDto> {

    @JsonProperty("Key")
    private String key;

    @JsonProperty("Value")
    private String value;

    @JsonProperty("Description")
    private String description;

    @JsonProperty("UpdateAuto")
    private Boolean updateAuto;

}
