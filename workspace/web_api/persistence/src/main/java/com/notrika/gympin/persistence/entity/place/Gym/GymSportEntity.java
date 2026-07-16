package com.notrika.gympin.persistence.entity.place.Gym;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.ticket.course.TicketCourseEntity;
import com.notrika.gympin.persistence.entity.ticket.subscribe.TicketSubscribeEntity;
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
@Table(name = "placeSport")
public class GymSportEntity extends BaseEntityWithCreateUpdate<GymSportEntity> {

    @ManyToOne
    @JoinColumn(name = "placeSportId")
    private GymEntity place;

    @ManyToOne
    @JoinColumn(name = "sportId")
    private SportEntity sport;

    @ManyToMany(mappedBy = "ticketSubscribeSport")
   @JsonIgnore
@ToString.Exclude
    private List<TicketSubscribeEntity> ticketSubscribes;

    @ManyToMany(mappedBy = "ticketCourseSport")
   @JsonIgnore
@ToString.Exclude
    private List<TicketCourseEntity> ticketCourse;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        GymSportEntity that = (GymSportEntity) o;
        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
