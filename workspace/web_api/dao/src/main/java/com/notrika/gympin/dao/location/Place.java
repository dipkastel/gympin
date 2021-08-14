package com.notrika.gympin.dao.location;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.notrika.gympin.dao.BaseEntity;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@Entity
@Table(name = "place")
public class Place extends BaseEntity {

    @Column(name = "name")
    private String name;

    @Column(name = "latitude")
    private double latitude;

    @Column(name = "longitude")
    private double longitude;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "region_id")
    @JsonIgnore
    private Region region;

}
