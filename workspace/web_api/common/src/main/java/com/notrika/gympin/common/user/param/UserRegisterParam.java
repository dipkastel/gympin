package com.notrika.gympin.common.user.param;

import com.notrika.gympin.common.BaseParam;
import com.notrika.gympin.common.user.enums.UserRole;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class UserRegisterParam extends BaseParam<UserRegisterParam> {

    @Builder.Default
    private UserRole userRole = UserRole.USER;
    private String username;
    private String phoneNumber;

}
