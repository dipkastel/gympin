package com.notrika.gympin.common.user.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.param.BaseParam;
import com.notrika.gympin.common.user.enums.UserRole;
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
public class UserRoleUpdateParam extends BaseParam<UserRoleUpdateParam> {

    @JsonProperty("UserId")
    private Long userId;
    @JsonProperty("Role")
    private UserRole role;
}
