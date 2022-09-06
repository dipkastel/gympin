package com.notrika.gympin.persistence.entity.location;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.notrika.gympin.common.SearchCriteria;
import com.notrika.gympin.persistence.entity.BaseEntity;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "region")
public class Region extends BaseEntity<Region> {

    @Column(name = "name",nullable = false)
    private String name;

    @ManyToOne(cascade = CascadeType.ALL,optional = false)
    @JoinColumn(name = "city_id")
    @JsonIgnore
    private City city;

/*    @OneToMany(mappedBy = "region",cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Place> places;*/

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Region region = (Region) o;

        return Objects.equals(getId(), region.getId());
    }

    @Override
    public int hashCode() {
        return 271369428;
    }
}
