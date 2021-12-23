package com.notrika.gympin.persistence.entity.location;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.notrika.gympin.persistence.entity.BaseEntity;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.sportplace.SportPlace;
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
@Table(name = "place")
public class Place extends BaseEntityWithCreateUpdate {

    @Column(name = "name",nullable = false)
    private String name;

    @Column(name = "latitude",nullable = false)
    private double latitude;

    @Column(name = "longitude",nullable = false)
    private double longitude;

    @Column(name = "address",nullable = false)
    private String address;

    @ManyToOne(cascade = CascadeType.ALL,optional = false)
    @JoinColumn(name = "region_id")
    @JsonIgnore
    private Region region;

    @OneToMany(mappedBy = "place")
    @ToString.Exclude
    private List<OptionOfPlace> optionsOfPlaces;

    @OneToMany(mappedBy = "place")
    @ToString.Exclude
    private List<PlaceOwner> placeOwners;

    @OneToMany(mappedBy = "place")
    @ToString.Exclude
    private List<SportPlace> sportPlaces;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Place place = (Place) o;

        return Objects.equals(getId(), place.getId());
    }

    @Override
    public int hashCode() {
        return 1945780767;
    }
}
