package com.notrika.gympin.common.user.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.BaseDto;
import com.notrika.gympin.common.BaseDtoWithCreate;
import com.notrika.gympin.common.user.enums.UserGroup;
import com.notrika.gympin.common.user.enums.UserStatus;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.util.Date;
import java.util.List;

@Data
@ToString
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class UserDto extends BaseDtoWithCreate<UserDto> /*implements UserDetails*/ {

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

    @JsonProperty("LastName")
    private String lastName;

    @JsonProperty("FollowersCount")
    private Long followersCount;

    @JsonProperty("FollowingsCount")
    private Long followingsCount;

    @JsonProperty("Bio")
    private String bio;

    @JsonProperty("Rate")
    private Float rate;

    @JsonProperty("Birthday")
    private Date birthday;

    @JsonProperty("NationalCode")
    private String nationalCode;

    @JsonProperty("Email")
    private String email;

    @JsonProperty("UserGroup")
    private UserGroup userGroup;

}
