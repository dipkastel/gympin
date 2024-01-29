package com.notrika.gympin.common.user.user.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.param.BaseParam;
import com.notrika.gympin.common.user.user.enums.RoleEnum;
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
    private RoleEnum userRole;

    @JsonProperty("FullName")
    private String fullName;

    @JsonProperty("PhoneNumber")
    private String phoneNumber;

    @JsonProperty("InvitedBy")
    private String invitedBy;

}
