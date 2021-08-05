package com.notrika.gympin.common.user.param;

import com.notrika.gympin.common.BaseParam;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class UserSendSmsParam extends BaseParam<UserSendSmsParam> {
    private String username;
    private String phoneNumber;
}
