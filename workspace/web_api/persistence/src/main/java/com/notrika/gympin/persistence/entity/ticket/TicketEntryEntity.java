package com.notrika.gympin.persistence.entity.ticket;

import com.notrika.gympin.common.athlete.gate.enums.TicketEntryStatus;
import com.notrika.gympin.persistence.entity.BaseEntity;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.communication.notification.NotificationEntity;
import com.notrika.gympin.persistence.entity.gate.GateTimingEntity;
import com.notrika.gympin.persistence.entity.plan.PlanEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "ticketEntry")
public class TicketEntryEntity extends BaseEntityWithCreateUpdate<TicketEntryEntity> {

    @ManyToOne(optional = false)
    private TicketEntity ticket;

    @ManyToOne()
    private UserEntity acceptedBy;

    @Column(name = "enterDate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date enterDate;

    @Column(name = "exitDate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date exitDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "ticketEntryStatus", nullable = false)
    private TicketEntryStatus ticketEntryStatus;

    @OneToMany(mappedBy = "ticketEntry", cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<TicketEntryMessageEntity> messages;
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        TicketEntryEntity that = (TicketEntryEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
