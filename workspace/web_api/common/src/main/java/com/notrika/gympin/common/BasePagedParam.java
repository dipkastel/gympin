package com.notrika.gympin.common;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class BasePagedParam<T> extends BaseParam<T> {

    @JsonProperty("Page")
    private int page = 0;

    @JsonProperty("Size")
    private int size = 20;

}
