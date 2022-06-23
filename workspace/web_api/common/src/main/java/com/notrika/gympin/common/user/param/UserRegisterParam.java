package com.notrika.gympin.common.user.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.BaseParam;
import com.notrika.gympin.common.user.enums.UserRole;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;
import java.util.List;

@Data
@SuperBuilder
@ToString
@EqualsAndHashCode(callSuper = true)
public class UserRegisterParam extends BaseParam<UserRegisterParam> {

    @JsonProperty("UserRole")
    private List<UserRoleParam> userRole;

    @JsonProperty("Username")
    private String username;

    @JsonProperty("PhoneNumber")
    private String phoneNumber;

    public UserRegisterParam() {
        UserRoleParam userRoleParam = new UserRoleParam();
        userRoleParam.setRole(UserRole.USER);
        userRole = new ArrayList<>();
        userRole.add(UserRoleParam.builder().role(UserRole.USER).build());
    }

}
