package com.notrika.gympin.persistence.entity.ticket.common;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.notrika.gympin.common.ticket.common.enums.DayOfWeek;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
//import com.notrika.gympin.persistence.entity.ticket.common.TicketSubscribeHallActiveTime;
import com.notrika.gympin.persistence.entity.place.hall.HallEntity;
import com.notrika.gympin.persistence.entity.ticket.course.TicketCourseEntity;
import com.notrika.gympin.persistence.entity.ticket.subscribe.TicketSubscribeEntity;
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
@Table(name = "ticketHallActiveTime")
public class TicketHallActiveTimeEntity extends BaseEntityWithCreateUpdate<TicketHallActiveTimeEntity> {

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "hallId")
    private HallEntity hall;

    @Column(name = "Name")
    private String name;

    @Column(name = "dayOfWeek")
    private DayOfWeek dayOfWeek;

    @Column(name = "openingTime")
    private LocalTime openingTime;

    @Column(name = "closingTime")
    private LocalTime closingTime;

    @ManyToMany(mappedBy = "activeTimes")
   @JsonIgnore
@ToString.Exclude
    private List<TicketSubscribeEntity> ticketSubscribes;

    @ManyToMany(mappedBy = "activeTimes")
   @JsonIgnore
@ToString.Exclude
    private List<TicketCourseEntity> ticketCourses;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        TicketHallActiveTimeEntity that = (TicketHallActiveTimeEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
