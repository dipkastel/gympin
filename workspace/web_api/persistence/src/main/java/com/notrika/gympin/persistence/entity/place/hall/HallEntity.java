package com.notrika.gympin.persistence.entity.place.hall;

import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.sport.SportEntity;
import com.notrika.gympin.persistence.entity.ticket.subscribe.TicketSubscribeHallActiveTime;
import com.notrika.gympin.persistence.entity.purchased.purchasedSubscribe.PurchasedSubscribeEntryRequstEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.sql.Time;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "placeHall")
@PrimaryKeyJoinColumn(name = "id")
public class HallEntity extends BaseEntityWithCreateUpdate<HallEntity> {

    @Column(name = "name")
    private String name;

    @Column(name = "openingTime")
    private Time openingTime;

    @Column(name = "closingTime")
    private Time closingTime;

    @Column(name = "trafficManagement")
    private Boolean trafficManagement;

    @Column(name = "enable")
    private Boolean enable;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "hallPlaceId")
    private PlaceEntity place;

    @ManyToOne
    @JoinColumn(name = "sportId")
    private SportEntity sport;

    @OneToMany(mappedBy = "hall")
    @ToString.Exclude
    private List<PurchasedSubscribeEntryRequstEntity> enterHall;

    @OneToMany(cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<TicketSubscribeHallActiveTime> actions;

    @OneToMany(cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<HallTrafficEntity> hallTraffic;

    @ManyToMany
    @JoinTable(name = "placeHallOwner", joinColumns = @JoinColumn(name = "hallId"), inverseJoinColumns = @JoinColumn(name = "hallOwnerUserId"))
    @ToString.Exclude
    private List<UserEntity> owner;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        HallEntity that = (HallEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
