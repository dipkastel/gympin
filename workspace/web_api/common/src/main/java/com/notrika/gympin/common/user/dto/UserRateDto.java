package com.notrika.gympin.common.user.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.dto.BaseDto;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class UserRateDto extends BaseDto<UserRateDto> {

    @JsonProperty("judger-user")
    private UserDto judgerUser;

    @JsonProperty("judging-user")
    private UserDto judgingUser;

    @JsonProperty("rate")
    private Float rate;

}
