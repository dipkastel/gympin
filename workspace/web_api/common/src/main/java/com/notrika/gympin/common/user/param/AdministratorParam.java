package com.notrika.gympin.common.user.param;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class AdministratorParam extends UserParam {

    private String administratorName;
    private String password;
    private String email;

}
