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

    @JsonProperty("Id")
    private Long id;

    //@JsonProperty("CreatedDate")
    @JsonIgnore
    private Date createdDate;

    //@JsonProperty("UpdatedDate")
    @JsonIgnore
    private Date updatedDate;

    //@JsonProperty("IsDeleted")
    @JsonIgnore
    private boolean isDeleted;
}
