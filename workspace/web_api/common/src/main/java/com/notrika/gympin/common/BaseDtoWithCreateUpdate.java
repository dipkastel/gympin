package com.notrika.gympin.common;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.user.dto.UserDto;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.util.Date;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class BaseDtoWithCreateUpdate<T> extends BaseDtoWithCreate<T> {

    @JsonProperty("UpdatedDate")
    private Date updatedDate;

    @JsonProperty("UpdaterUser")
    private UserDto updaterUser;

}
