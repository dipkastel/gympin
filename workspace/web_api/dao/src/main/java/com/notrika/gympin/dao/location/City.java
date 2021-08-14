package com.notrika.gympin.dao.location;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.notrika.gympin.dao.BaseEntity;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@Entity
@Table(name = "city")
public class City  extends BaseEntity {


    @Column(name = "name")
    private String name;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "state_id")
    @JsonIgnore
    private State state;

/*    @OneToMany(mappedBy = "city", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Region> regions;*/

}
