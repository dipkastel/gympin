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
@EqualsAndHashCode(callSuper = true)
public class CallToNumberParam extends BaseParam<CallToNumberParam> {

    @JsonProperty("from_number")
    private String from_number;

    @JsonProperty("to_number")
    private String to_number;

    @JsonProperty("caller_extension")
    private String caller_extension;

}
