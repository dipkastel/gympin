package com.notrika.gympin.persistence.entity.sport;

import com.notrika.gympin.persistence.entity.BaseEntity;
import com.notrika.gympin.persistence.entity.option.sport.SportOption;
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
