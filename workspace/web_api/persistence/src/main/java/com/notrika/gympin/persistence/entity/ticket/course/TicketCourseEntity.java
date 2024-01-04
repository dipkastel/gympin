package com.notrika.gympin.persistence.entity.ticket.course;

import com.notrika.gympin.persistence.entity.purchased.purchasedCourse.PurchasedCourseEntityEntity;
import com.notrika.gympin.persistence.entity.ticket.BuyableEntity;
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
@Table(name = "ticketCourse")
public class TicketCourseEntity extends BuyableEntity<TicketCourseEntity> {


    @Column(name = "startDate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date startDate;

    @Column(name = "endDate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date endDate;

    @Column(name = "startSellingDate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date startSellingDate;

    @Column(name = "endSellingDate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date endSellingDate;

    @Column(name = "courseCapacity")
    private Integer courseCapacity;

    @OneToMany(mappedBy = "ticketCourse")
    @ToString.Exclude
    private List<PurchasedCourseEntityEntity> purchasedCourse;

    @OneToMany(mappedBy = "ticketCourse")
    @ToString.Exclude
    private List<TicketCourseSessionsEntity> ticketCourseSessions;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        TicketCourseEntity that = (TicketCourseEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
