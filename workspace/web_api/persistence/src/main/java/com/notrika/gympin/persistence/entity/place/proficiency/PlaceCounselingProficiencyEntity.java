package com.notrika.gympin.persistence.entity.place.proficiency;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.place.option.PlaceOptionOfPlaceEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "placeCounselingProficiency")
public class PlaceCounselingProficiencyEntity extends BaseEntityWithCreateUpdate<PlaceCounselingProficiencyEntity> {

    @Column(name = "name")
    private String name;

    @Column(name = "weight")
    private String description;

    @OneToMany(mappedBy = "proficiency")
    @JsonIgnore
    @ToString.Exclude
    private List<PlaceCounselingProficiencyOfPlaceCounselingEntity> ProficiencyOfCounseling;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        PlaceCounselingProficiencyEntity that = (PlaceCounselingProficiencyEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
