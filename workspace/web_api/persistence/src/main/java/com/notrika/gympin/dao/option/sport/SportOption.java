package com.notrika.gympin.dao.option.sport;

import com.notrika.gympin.dao.BaseEntity;
import com.notrika.gympin.dao.sport.OptionOfSport;
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
