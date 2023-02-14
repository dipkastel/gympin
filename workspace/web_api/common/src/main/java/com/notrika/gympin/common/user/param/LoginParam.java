package com.notrika.gympin.common.user.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.param.BaseParam;
import com.notrika.gympin.common.user.enums.UsernameType;
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
public class LoginParam extends BaseParam<LoginParam> {

    @JsonProperty("UsernameType")
    private UsernameType usernameType = UsernameType.PHONENUMBER;

    @JsonProperty("Username")
    private String username;

    @JsonProperty("Password")
    private String password;

}
