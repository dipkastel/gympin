package com.notrika.gympin.persistence.entity.option.sport;

import com.notrika.gympin.persistence.entity.BaseEntity;
import com.notrika.gympin.persistence.entity.sport.OptionOfSport;
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
@Table(name = "sport_option")
public class SportOption extends BaseEntity {

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "sportOption")
    @ToString.Exclude
    private List<OptionOfSport> optionsOfSports;

}
