package com.notrika.gympin.persistence.entity.option.place;

import com.notrika.gympin.persistence.entity.BaseEntity;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.location.OptionOfPlace;
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
@Table(name = "place_option")
public class PlaceOption extends BaseEntityWithCreateUpdate {

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "placeOption")
    @ToString.Exclude
    private List<OptionOfPlace> optionsOfPlaces;

}
