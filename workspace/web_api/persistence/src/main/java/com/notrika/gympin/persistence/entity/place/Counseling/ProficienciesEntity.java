package com.notrika.gympin.persistence.entity.place.Counseling;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "placeCounselingProficiency")
public class ProficienciesEntity extends BaseEntityWithCreateUpdate<ProficienciesEntity> {

    @Column(name = "name")
    private String name;

    @Column(name = "weight")
    private String description;

    @OneToMany(mappedBy = "proficiencies")
    @JsonIgnore
    @ToString.Exclude
    private List<CounselingProficienciesEntity> proficiencyOfCounseling;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        ProficienciesEntity that = (ProficienciesEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
