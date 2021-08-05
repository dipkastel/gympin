package com.notrika.gympin.common.user.param;

import com.notrika.gympin.common.BaseParam;
import com.notrika.gympin.common.user.enums.AdminRoles;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class AdministratorLoginParam extends BaseParam<AdministratorLoginParam> {
    private Long id;

    private AdminRoles administratorRoles = AdminRoles.ADMIN;

    private String administratorname;

    private String phoneNumber;

    private String email;

    private String token;
}
