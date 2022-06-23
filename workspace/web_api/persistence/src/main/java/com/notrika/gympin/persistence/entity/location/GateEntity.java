package com.notrika.gympin.persistence.entity.location;

import com.notrika.gympin.common.sport.dto.SportDto;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.plan.PlanGateEntity;
import com.notrika.gympin.persistence.entity.sport.Sport;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.sql.Time;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "gate")
public class GateEntity extends BaseEntityWithCreateUpdate {

    @Column(name = "name")
    private String name;

    @Column(name = "opening_time")
    private Time openingTime;

    @Column(name = "closing_time")
    private Time closingTime;

    @ManyToOne
    private Place place;

    @ManyToOne
    private Sport sport;

    @OneToMany(mappedBy = "gate")
    @ToString.Exclude
    private List<PlanGateEntity> planGates;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        GateEntity that = (GateEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
