package com.notrika.gympin.common.user.param;

import com.notrika.gympin.common.BaseParam;
import com.notrika.gympin.common.user.enums.UserRole;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;
import java.util.List;

@Data
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
public class UserRegisterParam extends BaseParam<UserRegisterParam> {

    private List<UserRoleParam> userRole;
    private String username;
    private String phoneNumber;

    public UserRegisterParam() {
        UserRoleParam userRoleParam=new UserRoleParam();
        userRoleParam.setRole(UserRole.USER);
        userRole=new ArrayList<>();
        userRole.add(UserRoleParam.builder().role(UserRole.USER).build());
    }
}
