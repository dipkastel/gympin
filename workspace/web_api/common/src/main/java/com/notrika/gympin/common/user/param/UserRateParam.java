package com.notrika.gympin.common.user.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.param.BaseParam;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@AllArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class UserRateParam extends BaseParam<UserRateParam> {

    @JsonProperty("judger-user")
    private UserParam judgerUser;

    @JsonProperty("judging-user")
    private UserParam judgingUser;

    @JsonProperty("rate")
    private Float rate;

}
