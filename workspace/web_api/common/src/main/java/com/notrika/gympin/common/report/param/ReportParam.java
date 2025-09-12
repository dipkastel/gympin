package com.notrika.gympin.common.report.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.settings.location.enums.LocationType;
import com.notrika.gympin.common.util._base.param.BaseParam;
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
public class ReportParam extends BaseParam<ReportParam> {

    @JsonProperty("DayCount")
    private Long dayCount;
}
