package com.notrika.gympin.common.place.hallEnter.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.param.BaseParam;
import com.notrika.gympin.common.place.hall.param.HallParam;
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
public class EnterHallRequestParam extends BaseParam<EnterHallRequestParam> {

    @JsonProperty(value = "hall", required = true)
    private HallParam hall;

}
