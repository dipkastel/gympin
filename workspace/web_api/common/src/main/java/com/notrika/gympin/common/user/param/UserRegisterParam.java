package com.notrika.gympin.common.user.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.param.BaseParam;
import com.notrika.gympin.common.user.enums.UserRole;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@ToString
@EqualsAndHashCode(callSuper = true)
public class UserRegisterParam extends BaseParam<UserRegisterParam> {

    @JsonProperty("UserRole")
    private UserRoleParam userRole;

    @JsonProperty("Username")
    private String username;

    @JsonProperty("PhoneNumber")
    private String phoneNumber;

    @JsonProperty("InvitedBy")
    private String invitedBy;

    public UserRegisterParam() {
        UserRoleParam userRoleParam = new UserRoleParam();
        userRoleParam.setRole(UserRole.USER);
        userRole=UserRoleParam.builder().role(UserRole.USER).build();
    }

}
