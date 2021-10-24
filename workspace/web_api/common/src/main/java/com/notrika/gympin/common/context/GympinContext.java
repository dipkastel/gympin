package com.notrika.gympin.common.context;

import com.notrika.gympin.common.user.dto.UserDetailsImpl;
import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.enums.UserGroup;
import lombok.Data;

import java.lang.reflect.Method;
import java.util.HashMap;

@Data
public class GympinContext {

    public static final String USER_KEY = "USER";

    private UserGroup userGroup;
    private UserDto user;
    private UserDetailsImpl userDetails;
    private Method calledApi;
    private boolean ignoreExpire = false;
    private HashMap<String, Object> entry = new HashMap<>();

}
