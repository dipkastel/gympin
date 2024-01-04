package com.notrika.gympin.persistence.entity.place.option;

import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "placeOptionOfPlace")
public class PlaceOptionOfPlaceEntity extends BaseEntityWithCreateUpdate<PlaceOptionOfPlaceEntity> {

    @ManyToOne
    @JoinColumn(name = "placePlaceId")
    private PlaceEntity place;

    @ManyToOne
    @JoinColumn(name = "placeOptionId")
    private PlaceOptionEntity placeOption;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        PlaceOptionOfPlaceEntity that = (PlaceOptionOfPlaceEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
