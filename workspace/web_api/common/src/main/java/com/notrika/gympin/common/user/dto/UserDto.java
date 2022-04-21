package com.notrika.gympin.common.user.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.BaseDto;
import com.notrika.gympin.common.user.enums.UserStatus;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class UserDto extends BaseDto<UserDto> /*implements UserDetails*/ {

    //    @Builder.Default

    @JsonProperty("UserRole")
    private List<UserRoleDto> userRole;

    @JsonProperty("UserStatus")
    private UserStatus userStatus;

    @JsonProperty("Username")
    private String username;

    @JsonProperty("PhoneNumber")
    private String phoneNumber;

    @JsonProperty("Token")
    private String token;

    @JsonProperty("RefreshToken")
    private String refreshToken;

    @JsonProperty("Name")
    private String name;

    @JsonProperty("FollowersCount")
    private Long followersCount;

    @JsonProperty("FollowingsCount")
    private Long followingsCount;

}
