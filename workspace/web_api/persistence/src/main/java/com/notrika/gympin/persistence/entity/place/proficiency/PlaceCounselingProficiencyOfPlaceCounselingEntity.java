package com.notrika.gympin.persistence.entity.place.proficiency;

import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.place.PlaceCounselingEntity;
import com.notrika.gympin.persistence.entity.place.PlaceGymEntity;
import com.notrika.gympin.persistence.entity.place.option.PlaceOptionEntity;
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
@Table(name = "placeCounselingProficiencyOfPlaceCounselingEntity")
public class PlaceCounselingProficiencyOfPlaceCounselingEntity extends BaseEntityWithCreateUpdate<PlaceCounselingProficiencyOfPlaceCounselingEntity> {

    @ManyToOne
    @JoinColumn(name = "placeId")
    private PlaceCounselingEntity placeCounseling;

    @ManyToOne
    @JoinColumn(name = "proficiencyId")
    private PlaceCounselingProficiencyEntity proficiency;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        PlaceCounselingProficiencyOfPlaceCounselingEntity that = (PlaceCounselingProficiencyOfPlaceCounselingEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
