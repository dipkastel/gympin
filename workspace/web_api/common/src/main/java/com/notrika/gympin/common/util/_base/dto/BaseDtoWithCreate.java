package com.notrika.gympin.common.util._base.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.user.user.dto.UserDto;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.util.Date;


@Data
@ToString
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class BaseDtoWithCreate<T> extends BaseDto<T>{

    @JsonProperty("CreatedDate")
    private Date createdDate;

    @JsonProperty("CreatorUser")
    private UserDto creatorUser;

}
