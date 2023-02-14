package com.notrika.gympin.persistence.entity.plan;

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
@Table(name = "planRegister")
public class PlanRegisterEntity extends BaseEntity<PlanRegisterEntity> {

    @OneToOne
    private UserEntity user;

    @OneToOne
    private PlanGateTimingEntity planGate;

    @Column(name = "registerDate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date registerDate;

    @Column(name = "expireDate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date expireDate;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        PlanRegisterEntity that = (PlanRegisterEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
