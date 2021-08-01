package com.notrika.gympin.common.user.dto;

import com.notrika.gympin.common.user.enums.UserRoles;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserDto {
    private Long id;
    private UserRoles role = UserRoles.USER;
    private String username;
    private String phoneNumber;
    private String token;

}
