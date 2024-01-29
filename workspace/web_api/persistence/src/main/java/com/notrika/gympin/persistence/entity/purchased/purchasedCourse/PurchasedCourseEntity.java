package com.notrika.gympin.persistence.entity.purchased.purchasedCourse;

import com.notrika.gympin.common.purchased.purchasedCourse.enums.CoursePurchasedStatus;
import com.notrika.gympin.common.ticket.ticketCourse.enums.CourseStatus;
import com.notrika.gympin.persistence.entity.purchased.PurchasedBaseEntity;
import com.notrika.gympin.persistence.entity.ticket.course.TicketCourseEntity;
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
@Table(name = "purchasedCourse")
public class PurchasedCourseEntity extends PurchasedBaseEntity<PurchasedCourseEntity> {

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private CoursePurchasedStatus status;

    @ManyToOne
    @JoinColumn(name = "ticketCourseId")
    private TicketCourseEntity ticketCourse;

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
    @JoinTable(name = "PurchasedCourseCouches", joinColumns = @JoinColumn(name = "ticketCourseId"), inverseJoinColumns = @JoinColumn(name = "couchUserId"))
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


    @OneToMany(mappedBy = "purchasedCourse")
    @ToString.Exclude
    private List<PurchasedCourseEntryEntity> entryList;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        PurchasedCourseEntity that = (PurchasedCourseEntity) o;
        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
