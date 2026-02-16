package com.notrika.gympin.common.settings.base.param;

import com.fasterxml.jackson.annotation.JsonProperty;
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
public class GetCallListParam {

    @JsonProperty("fromDate")
    private String fromDate;

    @JsonProperty("toDate")
    private String toDate;

    @JsonProperty("directionType")
    private String directionType;

    @JsonProperty("type")
    private String type;

    @JsonProperty("from")
    private String from;

    @JsonProperty("to")
    private String to;

    @JsonProperty("extention")
    private String extention;

    @JsonProperty("disposition")
    private String disposition;

    @JsonProperty("id")
    private String id;

    @JsonProperty("limit")
    private Long limit;

    @JsonProperty("pagination")
    private Long pagination;

}
