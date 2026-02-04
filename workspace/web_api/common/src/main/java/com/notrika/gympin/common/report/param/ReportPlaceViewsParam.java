package com.notrika.gympin.common.report.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.param.BaseParam;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.util.Date;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class ReportPlaceViewsParam extends BaseParam<ReportPlaceViewsParam> {

    @JsonProperty("FromDate")
    private Date fromDate;

    @JsonProperty("ToDate")
    private Date toDate;

    @JsonProperty("PlaceId")
    private Long placId;
}
