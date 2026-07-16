package com.notrika.gympin.persistence.entity.place.Gym;

import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
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
//TODO rename to placeGymOptionOfPlaceGym
@Table(name = "placeOptionOfPlace")
public class OptionOfGymEntity extends BaseEntityWithCreateUpdate<OptionOfGymEntity> {

    @ManyToOne
    @JoinColumn(name = "placePlaceId")
    private GymEntity place;

    @ManyToOne
    @JoinColumn(name = "placeOptionId")
    private OptionEntity placeOption;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        OptionOfGymEntity that = (OptionOfGymEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
