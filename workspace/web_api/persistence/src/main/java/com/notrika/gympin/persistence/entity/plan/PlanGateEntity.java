package com.notrika.gympin.persistence.entity.plan;

import com.notrika.gympin.persistence.entity.BaseEntity;
import com.notrika.gympin.persistence.entity.location.GateEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "plan_gate")
public class PlanGateEntity extends BaseEntity {

    @ManyToOne(optional = false)
    private PlanEntity plan;

    @ManyToOne(optional = false)
    private GateEntity gate;

    @Column(name = "entry_count", nullable = false)
    private Short entryCount;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        PlanGateEntity that = (PlanGateEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
