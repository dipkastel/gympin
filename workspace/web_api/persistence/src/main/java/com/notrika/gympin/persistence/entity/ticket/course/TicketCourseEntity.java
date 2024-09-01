package com.notrika.gympin.persistence.entity.ticket.course;

import com.fasterxml.jackson.annotation.JsonIgnore;
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


    @Column(name = "courseStatus")
    @Enumerated(EnumType.STRING)
    private CourseStatus courseStatus;

    @Column(name = "targetOfCourse")
    private String targetOfCourse;

    @Column(name = "classCapacity")
    private Short classCapacity;

    @Column(name = "ageLimit")
    private String ageLimit;

    @Column(name = "Timing",columnDefinition = "varchar(800)")
    private String timing;

    @Column(name = "entryTotalCount")
    private Short entryTotalCount;

    @Column(name = "courseCapacity")
    private Integer courseCapacity;

    @Column(name = "courseLevel")
    private String courseLevel;

    @Column(name = "startDate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date startDate;

    @Column(name = "autoRenew",columnDefinition = "boolean default false")
    private Boolean autoRenew;

    @Column(name = "dayBeforeRenew",columnDefinition = "smallint(6) default 3")
    private Short dayBeforeRenew;

    @Column(name = "expireDuration")
    private Short expireDuration;

    @Column(name = "dayBeforeStartSell")
    private Short dayBeforeStartSell;

    @Column(name = "dayAfterStartSell")
    private Short dayAfterStartSell;

//    @Column(name = "endDate")
//    @Temporal(TemporalType.TIMESTAMP)
//    private Date endDate;

//    @Column(name = "startSellingDate")
//    @Temporal(TemporalType.TIMESTAMP)
//    private Date startSellingDate;

//    @Column(name = "endSellingDate")
//    @Temporal(TemporalType.TIMESTAMP)
//    private Date endSellingDate;

    @OneToMany(mappedBy = "ticketCourse")
   @JsonIgnore
@ToString.Exclude
    private List<PurchasedCourseEntity> purchasedCourse;

    @ManyToMany
    @JoinTable(name = "ticketCourseAction", joinColumns = @JoinColumn(name = "ticketCourseId"), inverseJoinColumns = @JoinColumn(name = "hallActionId"))
   @JsonIgnore
@ToString.Exclude
    private List<TicketHallActiveTimeEntity> activeTimes;

    @ManyToMany
    @JoinTable(name = "ticketCourseCouches", joinColumns = @JoinColumn(name = "ticketCourseId"), inverseJoinColumns = @JoinColumn(name = "couchUserId"))
   @JsonIgnore
@ToString.Exclude
    private List<UserEntity> coaches;

    @ManyToMany
    @JoinTable(name = "ticketCourseSport", joinColumns = @JoinColumn(name = "ticketCourseId"), inverseJoinColumns = @JoinColumn(name = "placeSportId"))
   @JsonIgnore
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
