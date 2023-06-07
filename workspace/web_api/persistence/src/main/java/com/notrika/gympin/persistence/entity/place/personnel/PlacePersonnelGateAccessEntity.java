package com.notrika.gympin.persistence.entity.place.personnel;

import com.notrika.gympin.common.place.personnel.enums.PlacePersonnelAccessEnum;
import com.notrika.gympin.persistence.entity.BaseEntity;
import com.notrika.gympin.persistence.entity.gate.GateEntity;
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
@Table(name = "placePersonelGateAccess")
public class PlacePersonnelGateAccessEntity extends BaseEntity<PlacePersonnelGateAccessEntity> {

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "place_personel_id")
    private PlacePersonnelEntity placePerson;

    @ManyToOne(cascade = CascadeType.ALL)
    private GateEntity gate;

    @Column(name = "access")
    private Boolean access;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        PlacePersonnelGateAccessEntity that = (PlacePersonnelGateAccessEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
