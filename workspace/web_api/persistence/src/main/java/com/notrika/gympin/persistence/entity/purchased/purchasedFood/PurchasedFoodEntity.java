package com.notrika.gympin.persistence.entity.purchased.purchasedFood;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.notrika.gympin.common.purchased.purchasedFood.enums.FoodPurchasedStatus;
import com.notrika.gympin.persistence.entity.purchased.PurchasedBaseEntity;
import com.notrika.gympin.persistence.entity.ticket.food.TicketFoodItemEntity;
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
@Table(name = "purchasedFood")
public class PurchasedFoodEntity extends PurchasedBaseEntity<PurchasedFoodEntity> {


    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private FoodPurchasedStatus status;

    @ManyToOne
    @JoinColumn(name = "foodItemId")
    @JsonIgnore
    @ToString.Exclude
    private TicketFoodItemEntity foodItem;

    @Column(name = "count", nullable = false)
    private Short count;

    @Column(name = "date")
    private Date date;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        PurchasedFoodEntity that = (PurchasedFoodEntity) o;
        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
