package com.notrika.gympin.dao.option.place;

import com.notrika.gympin.dao.BaseEntity;
import com.notrika.gympin.dao.location.OptionOfPlace;
import com.notrika.gympin.dao.location.Place;
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
@Table(name = "place_option")
public class PlaceOption extends BaseEntity {

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "placeOption")
    @ToString.Exclude
    private List<OptionOfPlace> optionsOfPlaces;

}
