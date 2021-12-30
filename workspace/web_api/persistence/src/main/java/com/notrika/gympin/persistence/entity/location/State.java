package com.notrika.gympin.persistence.entity.location;

import com.notrika.gympin.persistence.entity.BaseEntity;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "state")
public class State extends BaseEntity {

    @Column(name = "name",nullable = false)
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
