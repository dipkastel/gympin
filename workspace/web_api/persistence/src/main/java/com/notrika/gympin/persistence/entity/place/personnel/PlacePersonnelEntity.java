package com.notrika.gympin.persistence.entity.place.personnel;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.finance.user.invoice.InvoiceBuyableEntity;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.place.PlaceGymEntity;
import com.notrika.gympin.persistence.entity.ticket.BuyableEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "placePersonel")
public class PlacePersonnelEntity extends BaseEntityWithCreateUpdate<PlacePersonnelEntity> {

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "personnelPlaceId")
    private PlaceGymEntity place;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "personnelUserId")
    private UserEntity user;


    @OneToMany(mappedBy = "placePersonnel", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private Set<PlacePersonnelRoleEntity> placePersonnelRoles;

    @Column(name = "isBeneficiary", nullable = false, columnDefinition = "boolean default false")
    private Boolean isBeneficiary;

    @Column(name = "isPublic", nullable = false, columnDefinition = "boolean default true")
    private Boolean isPublic;

    @Column(name = "commissionFee")
    private Double commissionFee;

    @OneToMany(mappedBy = "placePerson")
    @JsonIgnore
    @ToString.Exclude
    private List<PlacePersonnelAccessEntity> placePersonnelAccess;

    @OneToMany(mappedBy = "placePerson")
    @JsonIgnore
    @ToString.Exclude
    private List<PlacePersonelBuyableAccessEntity> placePersonnelBuyableAccess;


    @OneToMany(mappedBy = "beneficiary", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private List<BuyableEntity> buyables;

    @OneToMany(mappedBy = "beneficiary", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private List<InvoiceBuyableEntity> invoiceBuyable;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        PlacePersonnelEntity that = (PlacePersonnelEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
