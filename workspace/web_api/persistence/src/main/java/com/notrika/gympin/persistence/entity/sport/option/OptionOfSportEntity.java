package com.notrika.gympin.persistence.entity.sport.option;

import com.notrika.gympin.persistence.entity.BaseEntity;
import com.notrika.gympin.persistence.entity.sport.SportEntity;
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
@Table(name = "sportSportOption")
public class OptionOfSportEntity extends BaseEntity<OptionOfSportEntity> {

    @ManyToOne
    @JoinColumn(name = "sport_id")
    private SportEntity sport;

    @ManyToOne
    @JoinColumn(name = "sport_option_id")
    private SportOptionEntity sportOption;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        OptionOfSportEntity that = (OptionOfSportEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
