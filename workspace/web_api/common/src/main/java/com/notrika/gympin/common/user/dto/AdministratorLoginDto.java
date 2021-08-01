package com.notrika.gympin.common.user.dto;

import com.notrika.gympin.common.user.enums.AdminRoles;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AdministratorLoginDto {
    private Long id;

    private AdminRoles administratorRoles = AdminRoles.ADMIN;

    private String administratorname;

    private String phoneNumber;

    private String email;

    private String token;

}
