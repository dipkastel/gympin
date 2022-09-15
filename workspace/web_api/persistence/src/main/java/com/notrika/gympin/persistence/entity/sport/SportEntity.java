package com.notrika.gympin.persistence.entity.sport;

import com.notrika.gympin.common.sport.enums.LaunchStatus;
import com.notrika.gympin.persistence.entity.BaseEntity;
import com.notrika.gympin.persistence.entity.event.BaseEventEntity;
import com.notrika.gympin.persistence.entity.location.GateEntity;
import com.notrika.gympin.persistence.entity.multimedia.SportMultimediaEntity;
import com.notrika.gympin.persistence.entity.sportplace.SportPlaceEntity;
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
public class SportEntity extends BaseEntity<SportEntity> {

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "launch_status")
    @Enumerated(EnumType.STRING)
    private LaunchStatus launchStatus;

    @OneToMany(mappedBy = "sport")
    @ToString.Exclude
    private List<OptionOfSportEntity> optionsOfSports;

    @OneToMany(mappedBy = "sport")
    @ToString.Exclude
    private List<SportPlaceEntity> sportPlaces;

    @OneToMany(mappedBy = "sport", cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<SportMultimediaEntity> sportMultimedias;

    @OneToMany(mappedBy = "sport", cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<BaseEventEntity> events;

    @OneToMany(mappedBy = "sport")
    @ToString.Exclude
    private List<GateEntity> gates;

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
