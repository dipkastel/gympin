package com.notrika.gympin.persistence.entity.ticket.subscribe;

import com.notrika.gympin.persistence.entity.purchased.purchasedSubscribe.PurchasedSubscribeEntity;
import com.notrika.gympin.persistence.entity.sport.placeSport.PlaceSportEntity;
import com.notrika.gympin.persistence.entity.ticket.BuyableEntity;
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
@Table(name = "ticketSubscribe")
public class TicketSubscribeEntity extends BuyableEntity<TicketSubscribeEntity> {

    @Column(name = "entryTotalCount")
    private Short entryTotalCount;

    @Column(name = "expireDuration")
    private Short expireDuration;

    @Column(name = "subscribeCapacity")
    private Integer subscribeCapacity;

    @OneToMany(mappedBy = "ticketSubscribe")
    @ToString.Exclude
    private List<PurchasedSubscribeEntity> purchasedSubscribes;

    @ManyToMany
    @JoinTable(name = "ticketSubsctibeAction", joinColumns = @JoinColumn(name = "ticketSubscribeId"), inverseJoinColumns = @JoinColumn(name = "hallActionId"))
    @ToString.Exclude
    private List<TicketSubscribeHallActiveTime> ActiveTimes;


    @ManyToMany
    @JoinTable(name = "ticketSubsctibeSport", joinColumns = @JoinColumn(name = "ticketSubscribeId"), inverseJoinColumns = @JoinColumn(name = "placeSportId"))
    @ToString.Exclude
    private List<PlaceSportEntity> ticketSubscribeSport;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        TicketSubscribeEntity that = (TicketSubscribeEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
