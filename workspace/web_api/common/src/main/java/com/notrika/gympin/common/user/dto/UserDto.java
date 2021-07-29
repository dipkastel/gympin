package com.notrika.gympin.common.user.dto;

import com.notrika.gympin.common.user.enums.Role;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserDto {
    private Long id;
    private Role role = Role.USER;
    private String username;
    private String phoneNumber;

}
