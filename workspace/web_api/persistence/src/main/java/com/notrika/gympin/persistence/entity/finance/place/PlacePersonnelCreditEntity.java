package com.notrika.gympin.persistence.entity.finance.place;

import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.corporate.CorporatePersonnelEntity;
import com.notrika.gympin.persistence.entity.finance.FinanceSerialEntity;
import com.notrika.gympin.persistence.entity.place.personnel.PlacePersonnelEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "placePersonelCredit")
public class PlacePersonnelCreditEntity extends BaseEntityWithCreateUpdate<PlacePersonnelCreditEntity> {

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "placePersonnelId")
    private PlacePersonnelEntity placePersonnel;

    @Column(name = "creditAmount")
    private BigDecimal creditAmount;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "serialId")
    private FinanceSerialEntity serial;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        PlacePersonnelCreditEntity that = (PlacePersonnelCreditEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
