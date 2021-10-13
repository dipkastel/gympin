package com.notrika.gympin.common.user.dto;

import com.notrika.gympin.common.BaseDto;
import com.notrika.gympin.common.user.enums.UserRole;
import com.notrika.gympin.common.user.enums.UserStatus;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class UserDto extends BaseDto<UserDto> /*implements UserDetails*/ {

    @Builder.Default
    private UserRole userRole = UserRole.USER;
    private UserStatus userStatus;
    private String username;
    private String phoneNumber;
    private String token;
    private String name;

}
