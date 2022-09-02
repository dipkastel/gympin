package com.notrika.gympin.common;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;
import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class BaseFilter<T> {

    @JsonProperty("start-id")
    private Long startId;

    @JsonProperty("end-id")
    private Long endId;

    @JsonIgnore
    private T childFilter = (T)this;

}
