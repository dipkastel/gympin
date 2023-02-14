package com.notrika.gympin.persistence.entity.location;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.location.enums.LocationType;
import com.notrika.gympin.persistence.entity.BaseEntity;
import com.notrika.gympin.persistence.entity.homePage.HomePageItemEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "location")
public class LocationEntity extends BaseEntity<LocationEntity> {

    @Column(name = "name")
    private String name;


    @Column(name = "mapPolygon")
    private String mapPolygon;

    @Column(name = "centerLat", nullable = false ,columnDefinition = "double default 0.0")
    private double centerLat;

    @Column(name = "centerLng", nullable = false,columnDefinition = "double default 0.0")
    private double centerLng;

    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    private LocationType locationType;

    @ManyToOne(fetch = FetchType.LAZY)
    @Getter
    @Setter
    private LocationEntity parent;

    @OneToMany(fetch = FetchType.LAZY,mappedBy = "parent")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Setter
    private List<LocationEntity> childes;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        LocationEntity city = (LocationEntity) o;

        return Objects.equals(getId(), city.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

}
