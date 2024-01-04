package com.notrika.gympin.persistence.entity.ticket.course;

import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.place.hall.HallEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "placeHallAction")
public class TicketCourseSessionsEntity extends BaseEntityWithCreateUpdate<TicketCourseSessionsEntity> {

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "hallId")
    private HallEntity hall;

    private LocalDateTime openingTime;

    private LocalDateTime closingTime;

    @ManyToOne
    @JoinColumn(name = "ticketCourseId")
    private TicketCourseEntity ticketCourse;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        TicketCourseSessionsEntity that = (TicketCourseSessionsEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
