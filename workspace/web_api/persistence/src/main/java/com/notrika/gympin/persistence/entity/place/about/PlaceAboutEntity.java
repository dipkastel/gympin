package com.notrika.gympin.persistence.entity.place.about;

import com.notrika.gympin.common.place.about.dto.PlaceAboutDto;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.place.PlaceGymEntity;
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
@Table(name = "placeAbout")
public class PlaceAboutEntity extends BaseEntityWithCreateUpdate<PlaceAboutEntity> {

    @ManyToOne
    @JoinColumn(name = "aboutPlaceId")
    private PlaceEntity place;


    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description", nullable = false,columnDefinition = "text")
    private String description;

    @Column(name = "acceptable", nullable = false)
    private Boolean acceptable;

    @Column(name = "active", nullable = false )
    private Boolean active = true;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        PlaceAboutEntity that = (PlaceAboutEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

}
