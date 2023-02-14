package com.notrika.gympin.persistence.entity.sportplace;

import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.plan.PlanEntity;
import com.notrika.gympin.persistence.entity.sport.SportEntity;
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
@Table(name = "sportPlace")
public class SportPlaceEntity extends BaseEntityWithCreateUpdate<SportPlaceEntity> {

    @ManyToOne
    @JoinColumn(name = "place_id")
    private PlaceEntity place;

    @ManyToOne
    @JoinColumn(name = "sport_id")
    private SportEntity sport;

    @ManyToMany(mappedBy = "planSport")
    @ToString.Exclude
    private List<PlanEntity> plans;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        SportPlaceEntity that = (SportPlaceEntity) o;
        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
