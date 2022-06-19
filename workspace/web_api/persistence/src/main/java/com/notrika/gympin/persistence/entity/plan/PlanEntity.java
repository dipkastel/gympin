package com.notrika.gympin.persistence.entity.plan;

import com.notrika.gympin.persistence.entity.BaseEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "plan")
public class PlanEntity extends BaseEntity {

    @Column(name = "name")
    private String name;

    //    @Column(name = "plan_type")
    //    private PlanType planType;

    @OneToMany(mappedBy = "plan")
    @ToString.Exclude
    private List<PlanGateEntity> planGates;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        PlanEntity that = (PlanEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
