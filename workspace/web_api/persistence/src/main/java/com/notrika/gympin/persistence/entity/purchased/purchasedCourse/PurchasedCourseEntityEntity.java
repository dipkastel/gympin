package com.notrika.gympin.persistence.entity.purchased.purchasedCourse;

import com.notrika.gympin.common.purchased.purchasedSubscribe.enums.PurchasedStatus;
import com.notrika.gympin.persistence.entity.purchased.PurchasedBaseEntity;
import com.notrika.gympin.persistence.entity.purchased.purchasedSubscribe.PurchasedSubscribeEntryEntity;
import com.notrika.gympin.persistence.entity.ticket.course.TicketCourseEntity;
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
public class PurchasedCourseEntityEntity extends PurchasedBaseEntity<PurchasedCourseEntityEntity> {

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private PurchasedStatus status;

    @ManyToOne
    @JoinColumn(name = "ticketCourseId")
    private TicketCourseEntity ticketCourse;

    @Column(name = "entryTotalCount", nullable = false)
    private Short entryTotalCount;

    @Column(name = "ticketCourseExpireDate")
    private Date ticketCourseExpireDate;

    @Column(name = "expireDate")
    private Date expireDate;

    @OneToMany(mappedBy = "purchasedSubscribe")
    @ToString.Exclude
    private List<PurchasedSubscribeEntryEntity> entryList;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        PurchasedCourseEntityEntity that = (PurchasedCourseEntityEntity) o;
        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
