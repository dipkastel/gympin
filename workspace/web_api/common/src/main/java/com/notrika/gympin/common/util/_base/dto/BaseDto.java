package com.notrika.gympin.common.util._base.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;

// FIXME: 4/14/2022 change all names to convention: lower case and seperated by "-"
@Data
@ToString
@SuperBuilder
@NoArgsConstructor
public class BaseDto<T> implements Serializable {
    private static final long serialVersionUID = 1L;

    @JsonProperty("Id")
    private Long id;

    @JsonProperty("IsDeleted")
    private boolean isDeleted;
}
