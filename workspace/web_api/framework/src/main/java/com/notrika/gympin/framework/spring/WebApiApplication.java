package com.notrika.gympin.framework.spring;

import com.notrika.gympin.persistence.dao.BaseRepositoryImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableCaching
@SpringBootApplication(scanBasePackages = {"com.notrika.gympin.*"})
@EnableJpaRepositories(basePackages = {"com.notrika.gympin.persistence.dao.*"}, repositoryBaseClass = BaseRepositoryImpl.class)
@EntityScan("com.notrika.gympin.persistence.entity.*")
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
