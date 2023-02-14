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
@Table(name = "placePlaceOption")
public class OptionOfPlaceEntity extends BaseEntityWithCreateUpdate<OptionOfPlaceEntity> {

    @ManyToOne
    @JoinColumn(name = "place_id")
    private PlaceEntity place;

    @ManyToOne
    @JoinColumn(name = "placeOption_id")
    private PlaceOptionEntity placeOption;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        OptionOfPlaceEntity that = (OptionOfPlaceEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
