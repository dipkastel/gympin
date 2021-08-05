package com.notrika.gympin.common.user.param;

import com.notrika.gympin.common.BaseParam;
import com.notrika.gympin.common.user.enums.UserRoles;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class UserParam extends BaseParam<UserParam> {
    private Long id;
    private UserRoles role = UserRoles.USER;
    private String username;
    private String phoneNumber;
    private String token;
}
