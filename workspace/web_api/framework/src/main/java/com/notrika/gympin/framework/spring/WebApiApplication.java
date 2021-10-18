package com.notrika.gympin.framework.spring;

import com.notrika.gympin.persistence.BaseRepositoryImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = {"com.notrika.gympin.*"})
@EnableJpaRepositories(basePackages = {"com.notrika.gympin.persistence.*"}, repositoryBaseClass = BaseRepositoryImpl.class)
@EntityScan("com.notrika.gympin.dao.*")
@Slf4j
public class WebApiApplication extends SpringBootServletInitializer {
    public static void main(String[] args) {
        log.info("LOG IS WORKING");
        SpringApplication.run(WebApiApplication.class, args);
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(WebApiApplication.class); //super.configure(builder);
    }


}
