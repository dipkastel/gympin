package com.notrika.gympin.common.user.dto;

import com.notrika.gympin.common.BaseDto;
import com.notrika.gympin.common.user.enums.UserRoles;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class UserDto extends BaseDto<UserDto> {
    private UserRoles role = UserRoles.USER;
    private String username;
    private String phoneNumber;
    private String token;

}
