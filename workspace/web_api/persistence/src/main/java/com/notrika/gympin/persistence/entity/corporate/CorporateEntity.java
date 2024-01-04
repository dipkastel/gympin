package com.notrika.gympin.persistence.entity.corporate;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.notrika.gympin.common.corporate.corporate.enums.CorporateStatusEnum;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.finance.Increase.FinanceIncreaseCorporateDepositEntity;
import com.notrika.gympin.persistence.entity.finance.Increase.FinanceIncreaseUserDepositEntity;
import com.notrika.gympin.persistence.entity.finance.corporate.FinanceCorporateEntity;
import com.notrika.gympin.persistence.entity.place.hall.HallEntity;
import com.notrika.gympin.persistence.entity.management.location.ManageLocationEntity;
import com.notrika.gympin.persistence.entity.multimedia.MultimediaEntity;
import com.notrika.gympin.persistence.entity.management.note.ManageNoteEntity;
import com.notrika.gympin.persistence.entity.support.SupportEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "corporate")
public class CorporateEntity extends BaseEntityWithCreateUpdate<CorporateEntity> {

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private CorporateStatusEnum status;

    @Column(name = "address")
    private String address;

    @Column(name = "stepsPay",columnDefinition = "Boolean default 0")
    private Boolean stepsPay;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "locationId")
    @JsonIgnore
    private ManageLocationEntity location;

    @OneToOne
    @ToString.Exclude
    private MultimediaEntity logo;

    @OneToMany(mappedBy = "corporate",fetch = FetchType.LAZY)
    @ToString.Exclude
    private List<ManageNoteEntity> notes;

    @OneToMany(mappedBy = "corporate",fetch = FetchType.LAZY)
    @ToString.Exclude
    private List<CorporatePersonnelEntity> personnel;

    @OneToMany(mappedBy = "corporate",fetch = FetchType.LAZY)
    @ToString.Exclude
    private List<CorporatePersonnelGroupEntity> category;

    @OneToOne(mappedBy = "corporate",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @ToString.Exclude
    private FinanceCorporateEntity financeCorporate;

    @OneToMany(mappedBy = "corporate",fetch = FetchType.LAZY)
    @ToString.Exclude
    private List<SupportEntity> support;

    @OneToMany(mappedBy = "corporate",fetch = FetchType.LAZY)
    @ToString.Exclude
    private List<FinanceIncreaseCorporateDepositEntity> corporateIncreases;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        HallEntity that = (HallEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

}
