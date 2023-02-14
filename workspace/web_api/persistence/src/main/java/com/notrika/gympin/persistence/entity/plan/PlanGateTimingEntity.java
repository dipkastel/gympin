package com.notrika.gympin.persistence.entity.plan;

import com.notrika.gympin.persistence.entity.BaseEntity;
import com.notrika.gympin.persistence.entity.gate.GateTimingEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "planGateTiming")
public class PlanGateTimingEntity extends BaseEntity<PlanGateTimingEntity> {

    @ManyToOne(optional = false)
    private PlanEntity plan;

    @ManyToOne(optional = false)
    private GateTimingEntity gateTimings;

    @Column(name = "entryCount")
    private Short entryCount;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        PlanGateTimingEntity that = (PlanGateTimingEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
