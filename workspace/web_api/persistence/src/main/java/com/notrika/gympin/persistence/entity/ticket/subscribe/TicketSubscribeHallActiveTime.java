package com.notrika.gympin.persistence.entity.ticket.subscribe;

import com.notrika.gympin.common.ticket.ticketSubscribe.enums.DayOfWeek;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
//import com.notrika.gympin.persistence.entity.ticket.subscribe.TicketSubscribeHallActiveTime;
import com.notrika.gympin.persistence.entity.place.hall.HallEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.time.LocalTime;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "ticketSubscribeHallActiveTime")
public class TicketSubscribeHallActiveTime extends BaseEntityWithCreateUpdate<TicketSubscribeHallActiveTime> {

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "hallId")
    private HallEntity hall;

    private DayOfWeek dayOfWeek;

    private LocalTime openingTime;

    private LocalTime closingTime;

    @ManyToMany(mappedBy = "ActiveTimes")
    @ToString.Exclude
    private List<TicketSubscribeEntity> ticketSubscribes;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        TicketSubscribeHallActiveTime that = (TicketSubscribeHallActiveTime) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
