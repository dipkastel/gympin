package com.notrika.gympin.common;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.user.dto.UserDto;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;
import java.util.Date;

@Data
@SuperBuilder
@NoArgsConstructor
public class BaseParam<T> implements Serializable {
    private static final long serialVersionUID = 1L;

    @JsonIgnore
    private transient UserDto user = new UserDto();

    @JsonProperty("Id")
    private Long id;

    @JsonProperty("CreatedDate")
    private Date createdDate;

    @JsonProperty("UpdatedDate")
    private Date updatedDate;

    @JsonProperty("IsDeleted")
    private boolean isDeleted;
}
