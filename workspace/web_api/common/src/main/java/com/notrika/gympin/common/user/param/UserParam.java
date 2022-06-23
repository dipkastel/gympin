package com.notrika.gympin.common.user.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.BaseParam;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@SuperBuilder
@AllArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class UserParam extends BaseParam<UserParam> {

    @Builder.Default
    private List<UserRoleParam> role = new ArrayList<>();

    @JsonProperty("Username")
    private String username;

    @JsonProperty("PhoneNumber")
    private String phoneNumber;

    @JsonProperty("Name")
    private String name;

    @JsonProperty("Password")
    private String password;

    @JsonProperty("Lastname")
    private String lastname;

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

    public UserParam() {
        //role.add(UserRole.USER);
    }

}
