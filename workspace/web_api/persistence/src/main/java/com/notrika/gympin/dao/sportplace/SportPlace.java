package com.notrika.gympin.dao.sportplace;

import com.notrika.gympin.dao.BaseEntity;
import com.notrika.gympin.dao.location.Place;
import com.notrika.gympin.dao.sport.Sport;
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
@Table(name = "sport_place")
public class SportPlace extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "place_id")
    private Place place;

    @ManyToOne
    @JoinColumn(name = "sport_id")
    private Sport sport;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        SportPlace that = (SportPlace) o;
        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return 0;
    }
}
