package com.notrika.gympin.common.util._base.param;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;
import java.util.Date;

// FIXME: 4/14/2022 change all names to convention: lower case and seperated by "-"
@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
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

    @JsonProperty("IsDeleted")
    //    @JsonIgnore
    private boolean isDeleted;

    @JsonIgnore
    private T object = (T) this;

}
