package com.notrika.gympin.framework.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@Configuration
@EnableAspectJAutoProxy
public class AppConfig {
    public static Boolean IsDebugModel;

    @Autowired
    public AppConfig(@Value("${app.debugmode}") Boolean debugMode) {
        this.IsDebugModel = debugMode;
    }
}
