package com.notrika.gympin.common.user.param;

import com.notrika.gympin.common.BaseParam;
import com.notrika.gympin.common.user.enums.UsernameType;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class LoginParam extends BaseParam<AdministratorLoginParam> {

    private UsernameType usernameType=UsernameType.PHONENUMBER;
    private String phoneNumber;
    private String password;

}