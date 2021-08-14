package com.notrika.gympin.dao.location;

import com.notrika.gympin.dao.BaseEntity;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@Entity
@Table(name = "state")
public class State extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

   /* @OneToMany(mappedBy = "state",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JsonIgnoreProperties()
    private Set<City> cities;*/

}
