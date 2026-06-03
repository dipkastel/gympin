package com.notrika.gympin.persistence.entity.purchased.purchasedAppointment;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.notrika.gympin.common.purchased.purchasedAppointment.enums.AppointmentPurchasedStatus;
import com.notrika.gympin.common.ticket.ticketAppointment.enums.AppointmentStatus;
import com.notrika.gympin.persistence.entity.purchased.PurchasedBaseEntity;
import com.notrika.gympin.persistence.entity.ticket.appointment.TicketAppointmentEntity;
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
@Table(name = "purchasedAppointment")
public class PurchasedAppointmentEntity extends PurchasedBaseEntity<PurchasedAppointmentEntity> {


    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private AppointmentPurchasedStatus status;

    @Column(name = "subscribeStatus")
    @Enumerated(EnumType.STRING)
    private AppointmentStatus appointmentStatus;

    @Column(name = "Timing", columnDefinition = "varchar(800)")
    private String timing;

    @ManyToOne
    @JoinColumn(name = "ticketAppointmentId")
    @JsonIgnore
    @ToString.Exclude
    private TicketAppointmentEntity ticketAppointment;

    @Column(name = "appointmentDate")
    private Date appointmentDate;

    @Column(name = "expireDate")
    private Date expireDate;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        PurchasedAppointmentEntity that = (PurchasedAppointmentEntity) o;
        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
