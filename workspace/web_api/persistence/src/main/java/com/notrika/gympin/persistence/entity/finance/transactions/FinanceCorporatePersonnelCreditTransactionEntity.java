package com.notrika.gympin.persistence.entity.finance.transactions;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.notrika.gympin.persistence.entity.finance.BaseTransactionEntity;
import com.notrika.gympin.persistence.entity.finance.FinanceSerialEntity;
import com.notrika.gympin.persistence.entity.finance.corporate.FinanceCorporatePersonnelCreditEntity;
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
@Table(name = "financeCorporatePersonelCreditTransaction")
public class FinanceCorporatePersonnelCreditTransactionEntity extends BaseTransactionEntity<FinanceCorporatePersonnelCreditTransactionEntity> {

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "serialId")
    @JsonIgnore
    @ToString.Exclude
    private FinanceSerialEntity serial;

    @ManyToOne
    @JoinColumn(name = "personelCreditId")
    @JsonIgnore
    @ToString.Exclude
    private FinanceCorporatePersonnelCreditEntity personnelCredit;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        FinanceCorporatePersonnelCreditTransactionEntity that = (FinanceCorporatePersonnelCreditTransactionEntity) o;
        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
