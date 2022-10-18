package com.notrika.gympin.common.rate.gate.param;

import com.notrika.gympin.common.BaseParam;
import com.notrika.gympin.common.location.param.GateParam;
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
public class RateGateParam extends BaseParam<RateGateParam> {

    private GateParam gate;

    private Float rate;

}
