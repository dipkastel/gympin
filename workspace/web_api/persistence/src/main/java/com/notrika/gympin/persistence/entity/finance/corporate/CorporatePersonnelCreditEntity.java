package com.notrika.gympin.persistence.entity.finance.corporate;

import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.corporate.CorporatePersonnelEntity;
import com.notrika.gympin.persistence.entity.finance.FinanceSerialEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "corporatePersonelCredit")
public class CorporatePersonnelCreditEntity extends BaseEntityWithCreateUpdate<CorporatePersonnelCreditEntity> {

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "corporatePersonnelId")
    private CorporatePersonnelEntity corporatePersonnel;

    @Column(name = "creditAmount")
    private BigDecimal creditAmount;


    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "serialId")
    private FinanceSerialEntity serial;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        CorporatePersonnelCreditEntity that = (CorporatePersonnelCreditEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
