package com.notrika.gympin.common.context;

import com.notrika.gympin.common.user.dto.UserDetailsImpl;
import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.enums.UserGroup;
import lombok.Data;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;
import java.util.HashMap;

@Data
@Component
public class GympinContext implements ApplicationContextAware {

    public static final String USER_KEY = "USER";

    private UserGroup userGroup;
    private UserDto user;
    private UserDetailsImpl userDetails;
    private Method calledApi;
    private boolean ignoreExpire = false;
    private HashMap<String, Object> entry = new HashMap<>();


    private static org.springframework.context.ApplicationContext context;

    @Override
    public void setApplicationContext(org.springframework.context.ApplicationContext applicationContext) throws BeansException {
        context = applicationContext;
    }

    public static org.springframework.context.ApplicationContext getApplicationContext() {
        return context;
    }

    public static <T> T getBean(Class<T> clazz) {
        return context.getBean(clazz);
    }

}
