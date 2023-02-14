package com.notrika.gympin.common.plan.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.dto.BaseDto;
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
public class PlanRegisterDto extends BaseDto<PlanRegisterDto> {

    @JsonProperty(value = "plan")
    private PlanDto plan;

    @JsonProperty(value = "register-date")
    private Date registerDate;

    @JsonProperty(value = "expire-date")
    private Date expireDate;

    @JsonProperty(value = "length")
    private Integer length;

    @JsonProperty(value = "expired")
    private boolean expired;

}
