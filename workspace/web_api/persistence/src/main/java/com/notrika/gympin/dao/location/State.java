package com.notrika.gympin.dao.location;

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
@Table(name = "state")
public class State extends BaseEntity {

    @Column(name = "name")
    private String name;

   /* @OneToMany(mappedBy = "state",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JsonIgnoreProperties()
    private Set<City> cities;*/

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        State state = (State) o;

        return Objects.equals(this.getId(), state.getId());
    }

    @Override
    public int hashCode() {
        return 732746439;
    }
}
