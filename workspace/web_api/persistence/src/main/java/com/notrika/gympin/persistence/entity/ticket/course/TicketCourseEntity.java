package com.notrika.gympin.persistence.entity.ticket.course;

import com.notrika.gympin.common.ticket.ticketCourse.enums.CourseStatus;
import com.notrika.gympin.persistence.entity.purchased.purchasedCourse.PurchasedCourseEntity;
import com.notrika.gympin.persistence.entity.sport.placeSport.PlaceSportEntity;
import com.notrika.gympin.persistence.entity.ticket.BuyableEntity;
import com.notrika.gympin.persistence.entity.ticket.common.TicketHallActiveTimeEntity;
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
@Table(name = "ticketCourse")
public class TicketCourseEntity extends BuyableEntity<TicketCourseEntity> {

    @ManyToMany
    @JoinTable(name = "ticketCourseAction", joinColumns = @JoinColumn(name = "ticketCourseId"), inverseJoinColumns = @JoinColumn(name = "hallActionId"))
    @ToString.Exclude
    private List<TicketHallActiveTimeEntity> activeTimes;

    @Column(name = "courseStatus")
    @Enumerated(EnumType.STRING)
    private CourseStatus courseStatus;

    @Column(name = "targetOfCourse")
    private String targetOfCourse;

    @Column(name = "classCapacity")
    private Short classCapacity;

    @Column(name = "ageLimit")
    private String ageLimit;

    @ManyToMany
    @JoinTable(name = "ticketCourseCouches", joinColumns = @JoinColumn(name = "ticketCourseId"), inverseJoinColumns = @JoinColumn(name = "couchUserId"))
    private List<UserEntity> coaches;

    @Column(name = "entryTotalCount")
    private Short entryTotalCount;

    @Column(name = "courseCapacity")
    private Integer courseCapacity;

    @Column(name = "courseLevel")
    private String courseLevel;

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

    @OneToMany(mappedBy = "ticketCourse")
    @ToString.Exclude
    private List<PurchasedCourseEntity> purchasedCourse;


    @ManyToMany
    @JoinTable(name = "ticketCourseSport", joinColumns = @JoinColumn(name = "ticketCourseId"), inverseJoinColumns = @JoinColumn(name = "placeSportId"))
    @ToString.Exclude
    private List<PlaceSportEntity> ticketCourseSport;
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
