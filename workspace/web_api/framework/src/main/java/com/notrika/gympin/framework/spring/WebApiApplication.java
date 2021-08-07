package com.notrika.gympin.framework.spring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = {"com.notrika.gympin.*"})
@EnableJpaRepositories(basePackages = {"com.notrika.gympin.dao.*"})
@EntityScan("com.notrika.gympin.dao.*")
public class WebApiApplication {


    public static void main(String[] args) {
        SpringApplication.run(WebApiApplication.class, args);
    }

}
