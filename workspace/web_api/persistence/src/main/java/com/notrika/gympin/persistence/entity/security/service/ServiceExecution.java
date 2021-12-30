package com.notrika.gympin.persistence.entity.security.service;

import com.notrika.gympin.persistence.entity.BaseEntity;
import com.notrika.gympin.persistence.entity.user.User;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "service_execution")
public class ServiceExecution extends BaseEntity {

    @Column(name = "service", nullable = false)
    private String service;

    @Column(name = "param_class", nullable = false)
    private Class paramClass;

    @Column(name = "dto_class", nullable = false)
    private Class dtoClass;

    @ManyToOne
    private User executorUser;

    @Column(name = "execution_date", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date executionDate;

    @Column(name = "param", nullable = false)
    private String param;

    @Column(name = "dto", nullable = false)
    private String dto;

    @PrePersist
    public void onCreate(){
        executionDate=new Date();
    }

}
