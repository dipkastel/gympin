package com.notrika.gympin.common.context;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.notrika.gympin.common.BaseParam;
import com.notrika.gympin.common.user.dto.AdministratorDto;
import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.enums.UserGroup;
import lombok.Data;

@Data
public class GympinContext {

    private UserGroup userGroup;
    private UserDto user;
    private AdministratorDto administrator;

}
