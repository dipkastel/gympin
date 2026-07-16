package com.notrika.gympin.persistence.entity.place.Gym;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.notrika.gympin.common.place.placeGym.sport.enums.LaunchStatus;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
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
@Table(name = "sport")
public class SportEntity extends BaseEntityWithCreateUpdate<SportEntity> {

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "launchStatus")
    @Enumerated(EnumType.STRING)
    private LaunchStatus launchStatus;


    @OneToMany(mappedBy = "sport")
   @JsonIgnore
@ToString.Exclude
    private List<GymSportEntity> placeSports;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        SportEntity sport = (SportEntity) o;
        return getId() != null && Objects.equals(getId(), sport.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
