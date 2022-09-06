package com.notrika.gympin.persistence.entity.location;

import com.notrika.gympin.common.SearchCriteria;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.accounting.AuditableEntitiesEntity;
import com.notrika.gympin.persistence.entity.athlete.gate.EnterGateEntity;
import com.notrika.gympin.persistence.entity.plan.PlanGateEntity;
import com.notrika.gympin.persistence.entity.sport.Sport;
import com.notrika.gympin.persistence.entity.user.User;
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
@PrimaryKeyJoinColumn(name = "id")
public class GateEntity extends AuditableEntitiesEntity<GateEntity> {

    @Column(name = "name")
    private String name;

    @Column(name = "opening_time")
    private Time openingTime;

    @Column(name = "closing_time")
    private Time closingTime;

    @ManyToOne(cascade = CascadeType.ALL)
    private Place place;

    @ManyToOne
    private Sport sport;

    @OneToMany(mappedBy = "gate")
    @ToString.Exclude
    private List<PlanGateEntity> planGates;

    @ManyToMany
    @JoinTable(name = "gate_guard",joinColumns=@JoinColumn(name = "gate_id"),inverseJoinColumns = @JoinColumn(name = "user_id"))
    @ToString.Exclude
    private List<User> guard;

    @OneToMany(mappedBy = "gate")
    @ToString.Exclude
    private List<EnterGateEntity> enterGate;

    @OneToMany(cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<GateTimingEntity> gateTimings;

    @Column(name = "about_gate")
    private String aboutGate;

    @Column(name = "gate_rules")
    private String gateRules;

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
