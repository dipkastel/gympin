package com.notrika.gympin.persistence.entity.place.personnel;

import com.notrika.gympin.common.place.enums.PlacePersonnelRole;
import com.notrika.gympin.common.user.enums.UserRole;
import com.notrika.gympin.persistence.entity.BaseEntity;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
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
@Table(name = "placePersonel")
public class PlacePersonnelEntity extends BaseEntity<PlacePersonnelEntity> {

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "place_id")
    private PlaceEntity place;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private PlacePersonnelRole userRole;

    @OneToMany(mappedBy = "placePerson")
    @ToString.Exclude
    private List<PlacePersonnelAccessEntity> placePersonnelAccess;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        PlacePersonnelEntity that = (PlacePersonnelEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
