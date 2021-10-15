package com.notrika.gympin.dao.location;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.notrika.gympin.dao.BaseEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "city")
public class City extends BaseEntity {

    @Column(name = "name")
    private String name;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "state_id")
    @JsonIgnore
    private State state;

/*    @OneToMany(mappedBy = "city", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Region> regions;*/

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        City city = (City) o;

        return Objects.equals(getId(), city.getId());
    }

    @Override
    public int hashCode() {
        return 39525063;
    }
}
