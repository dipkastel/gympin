package com.notrika.gympin.persistence.entity.athlete.gate;

import com.notrika.gympin.common.athlete.gate.enums.TicketEntryStatus;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.gate.GateEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "enterGate")
public class EnterGateEntity extends BaseEntityWithCreateUpdate<EnterGateEntity> {

    @Column(name = "referenceId", nullable = false)
    private String referenceId;

    @ManyToOne(optional = false)
    //    @JoinTable(name = "athleteGateEnter",joinColumns=@JoinColumn(name = "enterGate_id",nullable = false),inverseJoinColumns = @JoinColumn(name = "user_id",nullable =
    //    false))
    //    @ToString.Exclude
    private UserEntity athlete;

    @ManyToOne
    private UserEntity guard;

    @ManyToOne(optional = false)
    private GateEntity gate;

    @Column(name = "requestDate", nullable = false)
    private Timestamp requestDate;

    @Column(name = "lastUpdateStatusDate", nullable = false)
    private Timestamp lastUpdateStatusDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "enterGateStatus", nullable = false)
    private TicketEntryStatus enterGateStatus;

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
