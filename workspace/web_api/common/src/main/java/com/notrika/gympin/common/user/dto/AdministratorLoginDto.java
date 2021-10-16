package com.notrika.gympin.common.user.dto;

import com.notrika.gympin.common.BaseDto;
import com.notrika.gympin.common.user.enums.UserRole;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class AdministratorLoginDto extends BaseDto<AdministratorLoginDto> /*implements UserDetails*/ {

    private UserRole administratorRoles;

    private String administratorname;

    private String phoneNumber;

    private String email;

    private String token;

}
