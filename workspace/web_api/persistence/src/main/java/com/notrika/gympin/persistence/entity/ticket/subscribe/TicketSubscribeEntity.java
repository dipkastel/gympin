package com.notrika.gympin.persistence.entity.ticket.subscribe;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.notrika.gympin.common.ticket.ticketSubscribe.enums.SubscribeStatus;
import com.notrika.gympin.common.user.user.enums.Gender;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.place.PlaceGymEntity;
import com.notrika.gympin.persistence.entity.purchased.purchasedSubscribe.PurchasedSubscribeEntity;
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


    @Column(name = "subscribeStatus")
    @Enumerated(EnumType.STRING)
    private SubscribeStatus subscribeStatus;

    @Column(name = "entryTotalCount")
    private Short entryTotalCount;

    @Column(name = "expireDuration")
    private Short expireDuration;

    @Column(name = "subscribeCapacity")
    private Integer subscribeCapacity;

    @Column(name = "Timing", columnDefinition = "varchar(800)")
    private String timing;

    @Column(name = "gender")
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @OneToMany(mappedBy = "ticketSubscribe")
    @JsonIgnore
    @ToString.Exclude
    private List<PurchasedSubscribeEntity> purchasedSubscribes;

    @ManyToMany
    @JoinTable(name = "ticketSubsctibeAction", joinColumns = @JoinColumn(name = "ticketSubscribeId"), inverseJoinColumns = @JoinColumn(name = "hallActionId"))
    @JsonIgnore
    @ToString.Exclude
    private List<TicketHallActiveTimeEntity> activeTimes;

    @ManyToMany
    @JoinTable(name = "ticketSubsctibeSport", joinColumns = @JoinColumn(name = "ticketSubscribeId"), inverseJoinColumns = @JoinColumn(name = "placeSportId"))
    @JsonIgnore
    @ToString.Exclude
    private List<PlaceSportEntity> ticketSubscribeSport;

    @ManyToMany
    @JoinTable(name = "ticketSubscribeCouches", joinColumns = @JoinColumn(name = "ticketSubscribeId"), inverseJoinColumns = @JoinColumn(name = "couchUserId"))
    @JsonIgnore
    @ToString.Exclude
    private List<UserEntity> coaches;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "buyablePlaceId")
    @JsonIgnore
    @ToString.Exclude
    private PlaceGymEntity place;


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
