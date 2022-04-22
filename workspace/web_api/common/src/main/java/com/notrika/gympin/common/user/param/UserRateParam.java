package com.notrika.gympin.common.user.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.BaseParam;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class UserRateParam extends BaseParam<UserRateParam> {

    @JsonProperty("judger-user")
    private UserParam judgerUser;

    @JsonProperty("judging-user")
    private UserParam judgingUser;

    @JsonProperty("rate")
    private Integer rate;

}
