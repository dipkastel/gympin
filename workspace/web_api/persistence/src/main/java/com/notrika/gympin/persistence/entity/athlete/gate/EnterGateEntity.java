package com.notrika.gympin.persistence.entity.athlete.gate;

import com.notrika.gympin.common.SearchCriteria;
import com.notrika.gympin.common.athlete.gate.enums.EnterGateStatus;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.location.GateEntity;
import com.notrika.gympin.persistence.entity.user.User;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.sql.Time;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "enter_gate")
public class EnterGateEntity extends BaseEntityWithCreateUpdate<EnterGateEntity> {

    @Column(name = "reference_id",nullable = false)
    private String referenceId;

    @ManyToOne(optional = false)
//    @JoinTable(name = "athlete_gate_enter",joinColumns=@JoinColumn(name = "enter_gate_id",nullable = false),inverseJoinColumns = @JoinColumn(name = "user_id",nullable = false))
//    @ToString.Exclude
    private User athlete;

    @ManyToOne
    private User guard;

    @ManyToOne(optional = false)
    private GateEntity gate;

    @Column(name = "request_date",nullable = false)
    private Timestamp requestDate;

    @Column(name = "last_update_status_date",nullable = false)
    private Timestamp lastUpdateStatusDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "enter_gate_status",nullable = false)
    private EnterGateStatus enterGateStatus;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        EnterGateEntity that = (EnterGateEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
