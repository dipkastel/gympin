package com.notrika.gympin.common.user.dto;

import com.notrika.gympin.common.BaseDto;
import com.notrika.gympin.common.user.enums.AdminRoles;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class AdministratorLoginDto extends BaseDto<AdministratorLoginDto> {
    private Long id;

    private AdminRoles administratorRoles = AdminRoles.ADMIN;

    private String administratorname;

    private String phoneNumber;

    private String email;

    private String token;

}
