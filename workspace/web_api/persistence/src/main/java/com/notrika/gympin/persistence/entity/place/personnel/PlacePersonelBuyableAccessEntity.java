package com.notrika.gympin.persistence.entity.place.personnel;

import com.notrika.gympin.persistence.entity.BaseEntity;
import com.notrika.gympin.persistence.entity.ticket.BuyableEntity;
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
@Table(name = "placePersonelBuyableAccess")
public class PlacePersonelBuyableAccessEntity extends BaseEntity<PlacePersonelBuyableAccessEntity> {

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "placePersonelId")
    private PlacePersonnelEntity placePerson;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "buyableId")
    private BuyableEntity buyable;

    @Column(name = "access")
    private Boolean access;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        PlacePersonelBuyableAccessEntity that = (PlacePersonelBuyableAccessEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

}
