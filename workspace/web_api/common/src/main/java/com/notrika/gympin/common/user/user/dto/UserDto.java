package com.notrika.gympin.common.user.user.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.finance.transaction.dto.FinanceUserDto;
import com.notrika.gympin.common.user.user.enums.RoleEnum;
import com.notrika.gympin.common.util._base.dto.BaseDtoWithCreate;
import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
import com.notrika.gympin.common.user.user.enums.Gender;
import com.notrika.gympin.common.user.user.enums.UserGroup;
import com.notrika.gympin.common.user.user.enums.UserStatus;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class UserDto extends BaseDtoWithCreate<UserDto> /*implements UserDetails*/ {

    //    @Builder.Default

    @JsonProperty("UserRole")
    private Set<RoleEnum> userRole;

    @JsonProperty("UserStatus")
    private UserStatus userStatus;

    @JsonProperty("Username")
    private String username;

    @JsonProperty("PhoneNumber")
    private String phoneNumber;

    @JsonProperty("Gender")
    private Gender gender;

    @JsonProperty("Token")
    private String token;

    @JsonProperty("RefreshToken")
    private String refreshToken;

    @JsonProperty("FullName")
    private String fullName;

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

    @JsonProperty("Balance")
    private BigDecimal balance;

    @JsonProperty("UserGroup")
    private UserGroup userGroup;

    @JsonProperty("Avatar")
    private MultimediaDto avatar;

    @JsonProperty("FinanceUser")
    private FinanceUserDto financeUser;

}
