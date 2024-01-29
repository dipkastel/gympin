package com.notrika.gympin.persistence.entity.management.location;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.settings.location.enums.LocationType;
import com.notrika.gympin.persistence.entity.BaseEntity;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
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
@Table(name = "manageLocation")
public class ManageLocationEntity extends BaseEntity<ManageLocationEntity> {

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

    @OneToMany(mappedBy = "location",fetch = FetchType.LAZY)
    @ToString.Exclude
    private List<PlaceEntity> places;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parentId")
    @Getter
    @Setter
    private ManageLocationEntity parent;

    @OneToMany(mappedBy = "parent",fetch = FetchType.LAZY)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Setter
    private List<ManageLocationEntity> childes;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        ManageLocationEntity city = (ManageLocationEntity) o;

        return Objects.equals(getId(), city.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

}
