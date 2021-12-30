package com.notrika.gympin.persistence.entity.sport;

import com.notrika.gympin.common.sport.enums.LaunchStatus;
import com.notrika.gympin.persistence.entity.BaseEntity;
import com.notrika.gympin.persistence.entity.multimedia.SportMultimedia;
import com.notrika.gympin.persistence.entity.sportplace.SportPlace;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "sport")
public class Sport extends BaseEntity {

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "launch_status")
    @Enumerated(EnumType.STRING)
    private LaunchStatus launchStatus;

    @OneToMany(mappedBy = "sport")
    @ToString.Exclude
    private List<OptionOfSport> optionsOfSports;

    @OneToMany(mappedBy = "sport")
    @ToString.Exclude
    private List<SportPlace> sportPlaces;

    @OneToMany(mappedBy = "sport",cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<SportMultimedia> sportMultimedias;

}
