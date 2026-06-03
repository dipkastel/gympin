package com.notrika.gympin.persistence.entity.ticket.appointment;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.notrika.gympin.common.ticket.ticketAppointment.enums.AppointmentStatus;
import com.notrika.gympin.common.user.user.enums.Gender;
import com.notrika.gympin.persistence.entity.place.PlaceCounselingEntity;
import com.notrika.gympin.persistence.entity.purchased.purchasedAppointment.PurchasedAppointmentEntity;
import com.notrika.gympin.persistence.entity.ticket.BuyableEntity;
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
@Table(name = "ticketAppointment")
public class TicketAppointmentEntity extends BuyableEntity<TicketAppointmentEntity> {


    @Column(name = "appointmentStatus")
    @Enumerated(EnumType.STRING)
    private AppointmentStatus appointmentStatus;

    @Column(name = "expireDuration")
    private Short expireDuration;

    @Column(name = "appointmentCapacity")
    private Integer appointmentCapacity;

    @Column(name = "Timing", columnDefinition = "varchar(800)")
    private String timing;

    @Column(name = "gender")
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @OneToMany(mappedBy = "ticketAppointment")
    @JsonIgnore
    @ToString.Exclude
    private List<PurchasedAppointmentEntity> purchasedAppointments;


    @JsonIgnore
    public PlaceCounselingEntity getPlaceCounseling() {
        if (getPlace() instanceof PlaceCounselingEntity) {
            return (PlaceCounselingEntity) getPlace();
        }
        return null;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        TicketAppointmentEntity that = (TicketAppointmentEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
