package com.notrika.gympin.persistence.entity.place.hall;

import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "placeHallTraffic")
public class HallTrafficEntity extends BaseEntityWithCreateUpdate<HallTrafficEntity> {

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "hallId")
    private HallEntity hall;

    @Column(name = "traffic")
    private Short traffic;


}
