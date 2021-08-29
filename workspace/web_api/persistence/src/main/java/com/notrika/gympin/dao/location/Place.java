package com.notrika.gympin.dao.location;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.notrika.gympin.dao.BaseEntity;
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
public class Place extends BaseEntity {

    @Column(name = "name")
    private String name;

    @Column(name = "latitude")
    private double latitude;

    @Column(name = "longitude")
    private double longitude;

    @Column(name = "address")
    private String address;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "region_id")
    @JsonIgnore
    private Region region;

    @OneToMany(mappedBy = "place")
    @ToString.Exclude
    private List<OptionOfPlace> optionsOfPlaces;

    @OneToMany(mappedBy = "place")
    @ToString.Exclude
    private List<PlaceOwner> placeOwners;

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
