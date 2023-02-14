package com.notrika.gympin.persistence.entity.plan;

import com.notrika.gympin.common.user.enums.Gender;
import com.notrika.gympin.common.user.enums.PlanExpireType;
import com.notrika.gympin.common.user.enums.UserRole;
import com.notrika.gympin.persistence.entity.BaseEntity;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.sportplace.SportPlaceEntity;
import com.notrika.gympin.persistence.entity.support.SupportEntity;
import com.notrika.gympin.persistence.entity.ticket.TicketEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "plan")
public class PlanEntity extends BaseEntity<PlanEntity> {

    @Column(name = "name")
    private String name;

    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "gender")
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(name = "description")
    private String description;

    @Column(name = "valuePrice")
    private BigDecimal valuePrice;

    @Column(name = "enable")
    private Boolean enable;

    @Column(name = "entryTotalCount", nullable = false)
    private Short entryTotalCount;

    @Column(name = "startSellingDate")
    private Date startSellingDate;

    @Column(name = "endSellingDate")
    private Date endSellingDate;

    @Column(name = "expireType")
    @Enumerated(EnumType.STRING)
    private PlanExpireType planExpireType;

    @Column(name = "expireDate")
    private Date expireDate;

    @Column(name = "expireDuration")
    private Short expireDuration;

    @OneToMany(mappedBy = "plan")
    @ToString.Exclude
    private List<TicketEntity> ticket;


    @ManyToOne(cascade = CascadeType.ALL)
    private PlaceEntity place;

    @OneToMany(mappedBy = "plan")
    @ToString.Exclude
    private List<PlanGateTimingEntity> planGates;

    @ManyToMany
    @JoinTable(name = "planSport", joinColumns = @JoinColumn(name = "planId"), inverseJoinColumns = @JoinColumn(name = "sportPlaceId"))
    @ToString.Exclude
    private List<SportPlaceEntity> planSport;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        PlanEntity that = (PlanEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
