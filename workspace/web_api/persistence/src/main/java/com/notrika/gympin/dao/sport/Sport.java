package com.notrika.gympin.dao.sport;

import com.notrika.gympin.dao.BaseEntity;
import com.notrika.gympin.dao.sportplace.SportPlace;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
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

    @OneToMany(mappedBy = "sport")
    @ToString.Exclude
    private List<OptionOfSport> optionsOfSports;

    @OneToMany(mappedBy = "sport")
    @ToString.Exclude
    private List<SportPlace> sportPlaces;
}
