package com.notrika.gympin.persistence.entity.purchased.purchasedSubscribe;

import com.notrika.gympin.common.purchased.purchasedSubscribe.enums.SubscribePurchasedStatus;
import com.notrika.gympin.persistence.entity.ticket.subscribe.TicketSubscribeEntity;
import com.notrika.gympin.persistence.entity.purchased.PurchasedBaseEntity;
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

    @ManyToOne
    @JoinColumn(name = "ticketSubscribeId")
    private TicketSubscribeEntity ticketSubscribe;

    @Column(name = "entryTotalCount", nullable = false)
    private Short entryTotalCount;

    @Column(name = "ticketSubscribeExpireDate")
    private Date ticketSubscribeExpireDate;

    @Column(name = "expireDate")
    private Date expireDate;

    @OneToMany(mappedBy = "purchasedSubscribe")
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
