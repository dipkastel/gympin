package com.notrika.gympin.persistence.entity.place.personnel;

import com.notrika.gympin.common.place.personnel.enums.PlacePersonnelRoleEnum;
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
@Table(name = "PlacePersonnelRole")
public class PlacePersonnelRoleEntity extends BaseEntityWithCreateUpdate<PlacePersonnelRoleEntity> {



    @Column(name = "role", nullable = false)
    @Enumerated(EnumType.STRING)
    private PlacePersonnelRoleEnum role;

    @ManyToOne(cascade = CascadeType.ALL, optional = false, fetch = FetchType.LAZY)
    private PlacePersonnelEntity placePersonnel;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        PlacePersonnelRoleEntity role = (PlacePersonnelRoleEntity) o;
        return getId() != null && Objects.equals(getId(), role.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

}
