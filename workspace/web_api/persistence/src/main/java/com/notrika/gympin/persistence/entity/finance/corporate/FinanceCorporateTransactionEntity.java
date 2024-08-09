package com.notrika.gympin.persistence.entity.finance.corporate;

import com.notrika.gympin.common.finance.transaction.enums.TransactionCorporateType;
import com.notrika.gympin.common.finance.transaction.enums.TransactionStatus;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.corporate.CorporateEntity;
import com.notrika.gympin.persistence.entity.corporate.CorporatePersonnelEntity;
import com.notrika.gympin.persistence.entity.finance.BaseTransactionEntity;
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
@Table(name = "financeCorporateTransaction")
public class FinanceCorporateTransactionEntity extends BaseTransactionEntity<FinanceCorporateTransactionEntity> {


    @Column(name = "type", nullable = false)
    @Enumerated(EnumType.STRING)
    private TransactionCorporateType transactionCorporateType;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "serialId")
    private FinanceSerialEntity serial;


    @ManyToOne
    @JoinColumn(name = "personnelId")
    private CorporatePersonnelEntity corporatePersonnel;

    @ManyToOne
    @JoinColumn(name = "financeCorporateId")
    private FinanceCorporateEntity financeCorporate;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        FinanceCorporateTransactionEntity that = (FinanceCorporateTransactionEntity) o;
        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
