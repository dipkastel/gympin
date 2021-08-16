package com.notrika.gympin.common;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;
import java.util.Date;

@Data
@SuperBuilder
@NoArgsConstructor
public class BaseDto<T> implements Serializable {
    private static final long serialVersionUID = 1L;

    @JsonProperty("Id")
    private Long id;

    @JsonProperty("CreatedDate")
    private Date createdDate;

    @JsonProperty("UpdatedDate")
    private Date updatedDate;

    @JsonProperty("IsDeleted")
    private boolean isDeleted;
}
