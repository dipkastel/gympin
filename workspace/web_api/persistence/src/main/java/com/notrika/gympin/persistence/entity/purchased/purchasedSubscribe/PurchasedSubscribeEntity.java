package com.notrika.gympin.persistence.entity.purchased.purchasedSubscribe;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.notrika.gympin.common.purchased.purchasedSubscribe.enums.SubscribePurchasedStatus;
import com.notrika.gympin.common.ticket.ticketSubscribe.enums.SubscribeStatus;
import com.notrika.gympin.persistence.entity.ticket.subscribe.TicketSubscribeEntity;
import com.notrika.gympin.persistence.entity.purchased.PurchasedBaseEntity;
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
@Table(name = "purchasedSubscribe")
public class PurchasedSubscribeEntity extends PurchasedBaseEntity<PurchasedSubscribeEntity> {


    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private SubscribePurchasedStatus status;

    @Column(name = "subscribeStatus")
    @Enumerated(EnumType.STRING)
    private SubscribeStatus subscribeStatus;

    @Column(name = "Timing",columnDefinition = "varchar(800)")
    private String timing;

    @ManyToOne
    @JoinColumn(name = "ticketSubscribeId")
    private TicketSubscribeEntity ticketSubscribe;

    @ManyToMany
    @JoinTable(name = "PurchasedSubscribeCouches", joinColumns = @JoinColumn(name = "ticketSubscribeId"), inverseJoinColumns = @JoinColumn(name = "couchUserId"))
    private List<UserEntity> coaches;

    @Column(name = "entryTotalCount", nullable = false)
    private Short entryTotalCount;

    @Column(name = "ticketSubscribeExpireDate")
    private Date ticketSubscribeExpireDate;

    @Column(name = "expireDate")
    private Date expireDate;

    @OneToMany(mappedBy = "purchasedSubscribe")
   @JsonIgnore
@ToString.Exclude
    private List<PurchasedSubscribeEntryEntity> entryList;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        PurchasedSubscribeEntity that = (PurchasedSubscribeEntity) o;
        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
