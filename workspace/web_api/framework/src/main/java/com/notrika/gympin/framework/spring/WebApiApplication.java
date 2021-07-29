package com.notrika.gympin.framework.spring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = {"com.notrika.gympin.*","com.notrika.gympin.domain.*","com.notrika.gympin.service.impl.user"})
@EnableJpaRepositories(basePackages = {"com.notrika.gympin.dao.*"})
@EntityScan("com.notrika.gympin.dao.*")
//@ComponentScan(basePackageClasses = com.notrika.gympin.service.impl.user.UserControllerImpl.class)
public class WebApiApplication {


    public static void main(String[] args) {
        SpringApplication.run(WebApiApplication.class, args);
    }

}
