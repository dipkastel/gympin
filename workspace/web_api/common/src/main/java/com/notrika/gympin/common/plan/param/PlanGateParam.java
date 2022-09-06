package com.notrika.gympin.common.plan.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.BaseParam;
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
public class PlanGateParam extends BaseParam<PlanGateParam> {

//    @JsonProperty(value = "plan")
//    private PlanParam plan;

    @JsonProperty(value = "title", required = true)
    private String title;

    @JsonProperty(value = "description;", required = true)
    private String description;

    @JsonProperty(value = "gate", required = true)
    private GateParam gate;

    @JsonProperty(value = "gate-timing")
    private List<GateTimingParam> gateTimings;

    @JsonProperty(value = "entry-count", required = true)
    private Short entryCount;

    @JsonProperty(value = "price", required = true)
    private BigDecimal price;

    @JsonProperty(value = "discount-price")
    private BigDecimal discountPrice;

}
