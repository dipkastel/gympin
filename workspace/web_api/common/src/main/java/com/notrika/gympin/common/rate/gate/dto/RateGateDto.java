package com.notrika.gympin.common.rate.gate.dto;

import com.notrika.gympin.common._base.dto.BaseDto;
import com.notrika.gympin.common.gate.dto.GateDto;
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
public class RateGateDto extends BaseDto<RateGateDto> {

    private GateDto gate;

    private Float rate;


}
