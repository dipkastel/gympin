package com.notrika.gympin.common.context;

import com.notrika.gympin.common.user.dto.AdministratorDto;
import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.enums.UserGroup;
import com.notrika.gympin.common.user.service.UserService;
import lombok.Data;

import java.lang.reflect.Method;
import java.util.HashMap;

@Data
public class GympinContext {

    private UserGroup userGroup;
    private UserDto user;
    private AdministratorDto administrator;
    private Method calledApi;
    private boolean ignoreExpire=false;
    private HashMap<String,Object> entry=new HashMap<>();


}
