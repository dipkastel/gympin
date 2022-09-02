package com.notrika.gympin.common.plan.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.BaseDto;
import com.notrika.gympin.common.location.dto.GateDto;
import com.notrika.gympin.common.location.dto.GateTimingDto;
import com.notrika.gympin.common.location.param.GateParam;
import com.notrika.gympin.common.location.param.GateTimingParam;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class PlanGateDto extends BaseDto<PlanGateDto> {

//    @JsonProperty("plan")
//    private PlanDto plan;

    @JsonProperty(value = "title")
    private String title;

    @JsonProperty(value = "description;")
    private String description;

    @JsonProperty(value = "gate")
    private GateDto gate;

    @JsonProperty(value = "gate-timing")
    private List<GateTimingDto> gateTimings;

    @JsonProperty(value = "entry-count")
    private Short entryCount;

    @JsonProperty(value = "price")
    private BigDecimal price;

    @JsonProperty(value = "discount-price")
    private BigDecimal discountPrice;

}
