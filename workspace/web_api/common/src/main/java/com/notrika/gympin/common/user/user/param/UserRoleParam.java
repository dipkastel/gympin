package com.notrika.gympin.common.user.user.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.param.BaseParam;
import com.notrika.gympin.common.user.user.enums.RoleEnum;
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
public class UserRoleParam extends BaseParam<UserRoleParam> {

    @JsonProperty("Role")
    private RoleEnum role;

    @JsonProperty("User")
    private UserParam user;
}
