package com.notrika.gympin.persistence.entity.management.service;

import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
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
@Table(name = "manageServiceExecution")
public class ManageServiceExecutionEntity extends BaseEntityWithCreateUpdate<ManageServiceExecutionEntity> {

    @Column(name = "service", nullable = false)
    @Lob
    private String service;
//
//    @Column(name = "paramClass", nullable = false)
//    @Lob
//    private Class paramClass;
//
//    @Column(name = "dtoClass", nullable = false)
//    @Lob
//    private Class dtoClass;

    @ManyToOne
    @JoinColumn(name = "executorUserId")
    private UserEntity executorUser;

    @Column(name = "executionDate", nullable = false)
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
        ManageServiceExecutionEntity that = (ManageServiceExecutionEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
