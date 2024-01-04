package com.notrika.gympin.persistence.entity.finance;

import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.finance.Increase.FinanceIncreaseUserDepositEntity;
import com.notrika.gympin.persistence.entity.finance.corporate.CorporatePersonnelCreditEntity;
import com.notrika.gympin.persistence.entity.finance.corporate.FinanceCorporateTransactionEntity;
import com.notrika.gympin.persistence.entity.finance.income.FinanceDiscountTransactionEntity;
import com.notrika.gympin.persistence.entity.finance.income.FinanceIncomeTransactionEntity;
import com.notrika.gympin.persistence.entity.finance.invoice.InvoiceEntity;
import com.notrika.gympin.persistence.entity.finance.user.FinanceUserTransactionEntity;
import com.notrika.gympin.persistence.entity.purchased.PurchasedBaseEntity;
import com.notrika.gympin.persistence.entity.purchased.purchasedSubscribe.PurchasedSubscribeEntity;
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
@Table(name = "financeSerial")
public class FinanceSerialEntity extends BaseEntityWithCreateUpdate<FinanceSerialEntity> {

    @Column(name = "serial", nullable = false)
    private String serial;

    @OneToMany(mappedBy = "serial",fetch = FetchType.LAZY)
    @ToString.Exclude
    private List<FinanceUserTransactionEntity> userTransactions;
    @OneToMany(mappedBy = "serial",fetch = FetchType.LAZY)
    @ToString.Exclude
    private List<FinanceCorporateTransactionEntity> corporateTransactions;

    @OneToMany(mappedBy = "serial",fetch = FetchType.LAZY)
    @ToString.Exclude
    private List<FinanceIncomeTransactionEntity> incomeTransactions;

    @OneToMany(mappedBy = "serial",fetch = FetchType.LAZY)
    @ToString.Exclude
    private List<FinanceIncreaseUserDepositEntity> increases;

    @OneToMany(mappedBy = "serial",fetch = FetchType.LAZY)
    @ToString.Exclude
    private List<FinanceDiscountTransactionEntity> discount;

    @OneToMany(mappedBy = "serial",fetch = FetchType.LAZY)
    @ToString.Exclude
    private List<InvoiceEntity> invoices;

    @OneToMany(mappedBy = "serial",fetch = FetchType.LAZY)
    @ToString.Exclude
    private List<CorporatePersonnelCreditEntity> personnelPays;

    @OneToMany(mappedBy = "serial",fetch = FetchType.LAZY)
    @ToString.Exclude
    private List<PurchasedBaseEntity> purchasedBases;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        FinanceSerialEntity that = (FinanceSerialEntity) o;
        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
