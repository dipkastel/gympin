package com.notrika.gympin.dao.location;

import com.notrika.gympin.dao.BaseEntity;
import com.notrika.gympin.dao.option.place.PlaceOption;
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
@Table(name = "place_place_option")
public class OptionOfPlace extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "place_id")
    private Place place;

    @ManyToOne
    @JoinColumn(name = "place_option_id")
    private PlaceOption placeOption;

}
