package com.notrika.gympin.common.user.param;

import com.notrika.gympin.common.BaseParam;
import com.notrika.gympin.common.user.enums.UserRole;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@SuperBuilder
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class UserParam extends BaseParam<UserParam> {

    @Builder.Default
    private List<UserRole> role = new ArrayList<>();
    private String username;
    private String phoneNumber;
    private String name;
    private String password;
    private String lastname;
    private Date birthday;
    private String nationalCode;
    private String email;

    public UserParam(){
        //role.add(UserRole.USER);
    }


}
