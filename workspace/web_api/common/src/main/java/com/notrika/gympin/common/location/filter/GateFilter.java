package com.notrika.gympin.common.location.filter;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.BaseFilter;
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
public class GateFilter extends BaseFilter<GateFilter> {

    @JsonProperty(value = "name")
    private String name;

}
