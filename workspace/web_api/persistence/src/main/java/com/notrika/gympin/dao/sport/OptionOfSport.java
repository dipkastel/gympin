package com.notrika.gympin.dao.sport;

import com.notrika.gympin.dao.BaseEntity;
import com.notrika.gympin.dao.option.sport.SportOption;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "sport_sport_option")
public class OptionOfSport extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "sport_id")
    private Sport sport;

    @ManyToOne
    @JoinColumn(name = "sport_option_id")
    private SportOption sportOption;
}
