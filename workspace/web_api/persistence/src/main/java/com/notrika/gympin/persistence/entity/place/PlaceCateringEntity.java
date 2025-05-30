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
import java.sql.Time;
import java.util.List;
import java.util.Objects;

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

    @OneToOne
    @JsonIgnore
    @ToString.Exclude
    private MultimediaEntity logo;

    @OneToMany(mappedBy = "place", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private List<PlaceQrMessageEntity> qrMessages;

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
