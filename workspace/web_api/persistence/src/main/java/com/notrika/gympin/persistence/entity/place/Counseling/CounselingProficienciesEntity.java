package com.notrika.gympin.persistence.entity.place.Counseling;

import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "placeCounselingProficiencyOfPlaceCounseling")
public class CounselingProficienciesEntity extends BaseEntityWithCreateUpdate<CounselingProficienciesEntity> {

    @ManyToOne
    @JoinColumn(name = "placeId")
    private CounselingEntity counseling;

    @ManyToOne
    @JoinColumn(name = "proficiencyId")
    private ProficienciesEntity proficiencies;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        CounselingProficienciesEntity that = (CounselingProficienciesEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
