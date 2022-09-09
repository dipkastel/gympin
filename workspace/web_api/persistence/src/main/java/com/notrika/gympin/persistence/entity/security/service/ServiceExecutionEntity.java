package com.notrika.gympin.persistence.entity.security.service;

import com.notrika.gympin.persistence.entity.BaseEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "service_execution")
public class ServiceExecutionEntity extends BaseEntity<ServiceExecutionEntity> {

    @Column(name = "service", nullable = false)
    @Lob
    private String service;

    @Column(name = "param_class", nullable = false)
    @Lob
    private Class paramClass;

    @Column(name = "dto_class", nullable = false)
    @Lob
    private Class dtoClass;

    @ManyToOne
    private UserEntity executorUser;

    @Column(name = "execution_date", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date executionDate;

    @Column(name = "param", nullable = false)
    @Lob
    private String param;

    @Column(name = "dto", nullable = false)
    @Lob
    private String dto;

    @PrePersist
    public void onCreate() {
        executionDate = new Date();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        ServiceExecutionEntity that = (ServiceExecutionEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
