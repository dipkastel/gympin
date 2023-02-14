package com.notrika.gympin.common.user.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.param.BaseParam;
import com.notrika.gympin.common.user.enums.Gender;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.Date;

@Data
@SuperBuilder
@AllArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class UserParam extends BaseParam<UserParam> {

    @Builder.Default
    private UserRoleParam role;

    @JsonProperty("Username")
    private String username;

    @JsonProperty("PhoneNumber")
    private String phoneNumber;

    @JsonProperty("Gender")
    private Gender gender;

    @JsonProperty("Password")
    private String password;

    @JsonProperty("FullName")
    private String fullName;

    @JsonProperty("Birthday")
    private Date birthday;

    @JsonProperty("NationalCode")
    private String nationalCode;

    @JsonProperty("Email")
    private String email;

    @JsonProperty("Bio")
    private String bio;

    @JsonProperty("AvatarId")
    private Long avatarId;




}
