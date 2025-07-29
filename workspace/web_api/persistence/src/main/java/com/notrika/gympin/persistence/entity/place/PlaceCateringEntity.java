package com.notrika.gympin.persistence.entity.place;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.notrika.gympin.persistence.entity.multimedia.MultimediaEntity;
import com.notrika.gympin.persistence.entity.place.qrMessage.PlaceQrMessageEntity;
import com.notrika.gympin.persistence.entity.ticket.food.TicketFoodItemEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Time;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "placeCatering")
public class PlaceCateringEntity extends PlaceEntity<PlaceCateringEntity> {

    @Column(name = "listOrder")
    private Short order;

    @Column(name = "autoDiscount", nullable = false, columnDefinition = "bit default 1")
    private boolean autoDiscount;

    @Column(name = "lastOrderTime")
    private Time lastOrderTime;

    @Column(name = "lastOrderDayCount")
    private Short lastOrderDayCount;

    @Column(name = "minOrderCount")
    private Short minOrderCount;

    @Column(name = "freeDeliveryPrice")
    private BigDecimal freeDeliveryPrice;

    @Column(name = "hasDishesPrice", nullable = false , columnDefinition = "boolean default false")
    private Boolean hasDishesPrice;

    @OneToOne
    @JsonIgnore
    @ToString.Exclude
    private MultimediaEntity logo;

    @OneToMany(mappedBy = "place", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private List<PlaceQrMessageEntity> qrMessages;

    public List<TicketFoodItemEntity> getTicketFoodItems() {
        return getBuyables().stream()
                .filter(b -> b instanceof TicketFoodItemEntity)
                .map(b -> (TicketFoodItemEntity) b)
                .collect(Collectors.toList());
    }

    public void addTicketFoodItem(TicketFoodItemEntity foodItem) {
        addBuyable(foodItem);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        PlaceCateringEntity place = (PlaceCateringEntity) o;

        return Objects.equals(getId(), place.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

}
