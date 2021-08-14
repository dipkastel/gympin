package com.notrika.gympin.framework.spring;

import com.notrika.gympin.dao.BaseRepositoryImpl;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = {"com.notrika.gympin.*"})
@EnableJpaRepositories(basePackages = {"com.notrika.gympin.dao.*"},repositoryBaseClass = BaseRepositoryImpl.class)
@EntityScan("com.notrika.gympin.dao.*")
public class WebApiApplication {


    public static void main(String[] args) {
        SpringApplication.run(WebApiApplication.class, args);
    }

}
