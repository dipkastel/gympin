package com.notrika.gympin.common.util._base.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.support.enums.SupportStatus;
import com.notrika.gympin.common.user.user.dto.UserDto;
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
