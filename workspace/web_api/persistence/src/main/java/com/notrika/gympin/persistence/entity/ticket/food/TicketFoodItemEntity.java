package com.notrika.gympin.persistence.entity.ticket.food;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.notrika.gympin.persistence.entity.place.PlaceCateringEntity;
import com.notrika.gympin.persistence.entity.purchased.purchasedFood.PurchasedFoodEntity;
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
@Table(name = "ticketFoodItem")
public class TicketFoodItemEntity extends BuyableEntity<TicketFoodItemEntity> {

    @OneToMany(mappedBy = "foodItem")
    @JsonIgnore
    @ToString.Exclude
    private List<PurchasedFoodEntity> purchasedFood;

    @OneToMany(mappedBy = "foodItem")
    @JsonIgnore
    @ToString.Exclude
    private List<TicketFoodMenuEntity> menu;

    @Column(name = "isCount", nullable = false , columnDefinition = "boolean default true")
    private Boolean isCount;

    @Column(name = "minOrderCount", nullable = false , columnDefinition = "smallint(6) default 1")
    private Short minOrderCount;

    @Column(name = "maxOrderCount", nullable = false , columnDefinition = "smallint(6) default 1000")
    private Short maxOrderCount;



    public PlaceCateringEntity getPlaceCatering() {
        if (getPlace() instanceof PlaceCateringEntity) {
            return (PlaceCateringEntity) getPlace();
        }
        return null;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        TicketFoodItemEntity that = (TicketFoodItemEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
