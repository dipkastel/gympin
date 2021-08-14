package com.notrika.gympin.dao.location;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.notrika.gympin.dao.BaseEntity;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@Entity
@Table(name = "region")
public class Region extends BaseEntity {

    @Column(name = "name")
    private String name;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "city_id")
    @JsonIgnore
    private City city;

/*    @OneToMany(mappedBy = "region",cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Place> places;*/

}
