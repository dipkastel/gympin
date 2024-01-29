package com.notrika.gympin.persistence.entity.purchased.purchasedCourse;


import com.notrika.gympin.common.purchased.purchasedCourse.enums.CourseEntryStatus;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.user.UserEntity;
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
@Table(name = "purchasedCourseEntry")
public class PurchasedCourseEntryEntity extends BaseEntityWithCreateUpdate<PurchasedCourseEntryEntity> {

    @ManyToOne(optional = false)
    @JoinColumn(name = "purchasedCourseId")
    private PurchasedCourseEntity purchasedCourse;

    @ManyToOne
    @JoinColumn(name = "acceptUserId")
    private UserEntity acceptedBy;

    @Column(name = "enterDate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date enterDate;

    @Column(name = "exitDate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date exitDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "courseEntryStatus", nullable = false)
    private CourseEntryStatus CourseEntryStatus;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        PurchasedCourseEntryEntity that = (PurchasedCourseEntryEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
