package com.notrika.gympin.framework.spring;

import com.notrika.gympin.persistence.dao.BaseRepositoryImpl;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = {"com.notrika.gympin.*"})
@EnableJpaRepositories(basePackages = {"com.notrika.gympin.persistence.dao.*"}, repositoryBaseClass = BaseRepositoryImpl.class)
@EntityScan("com.notrika.gympin.persistence.entity.*")
public class WebApiApplication extends SpringBootServletInitializer {
    public static void main(String[] args) {
        SpringApplication.run(WebApiApplication.class, args);
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(WebApiApplication.class); //super.configure(builder);
    }


}
