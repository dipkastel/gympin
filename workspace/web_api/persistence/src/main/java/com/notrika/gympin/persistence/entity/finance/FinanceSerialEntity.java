package com.notrika.gympin.persistence.entity.finance;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.notrika.gympin.common.finance.serial.enums.ProcessTypeEnum;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.finance.corporate.FinanceIncreaseCorporateDepositRequestEntity;
import com.notrika.gympin.persistence.entity.finance.transactions.FinanceAffiliateTransactionEntity;
import com.notrika.gympin.persistence.entity.finance.transactions.FinanceCorporatePersonnelCreditTransactionEntity;
import com.notrika.gympin.persistence.entity.finance.transactions.FinanceCorporateTransactionEntity;
import com.notrika.gympin.persistence.entity.finance.transactions.FinanceUserTransactionEntity;
import com.notrika.gympin.persistence.entity.finance.transactions.gympin.FinanceDiscountTransactionEntity;
import com.notrika.gympin.persistence.entity.finance.transactions.gympin.FinanceIncomeTransactionEntity;
import com.notrika.gympin.persistence.entity.finance.invoice.InvoiceEntity;
import com.notrika.gympin.persistence.entity.finance.user.requests.FinanceIncreaseUserDepositRequestEntity;
import com.notrika.gympin.persistence.entity.finance.user.requests.FinanceSettlementUserDepositRequestEntity;
import com.notrika.gympin.persistence.entity.purchased.PurchasedBaseEntity;
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


    @Column(name = "process", nullable = false)
    @Enumerated(EnumType.STRING)
    private ProcessTypeEnum processTypeEnum;

    //transactions
    @OneToMany(mappedBy = "serial", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private List<FinanceUserTransactionEntity> userTransactions;


    @OneToMany(mappedBy = "serial", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private List<FinanceAffiliateTransactionEntity> affiliateTransactions;

    @OneToMany(mappedBy = "serial", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private List<FinanceCorporateTransactionEntity> corporateTransactions;

    @OneToMany(mappedBy = "serial", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private List<FinanceCorporatePersonnelCreditTransactionEntity> personnelCreditTransactions;

    @OneToMany(mappedBy = "serial", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private List<FinanceIncomeTransactionEntity> incomeTransactions;

    @OneToMany(mappedBy = "serial", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private List<FinanceDiscountTransactionEntity> discount;

    //request
    @OneToMany(mappedBy = "serial", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private List<FinanceIncreaseUserDepositRequestEntity> userIncreases;

    @OneToMany(mappedBy = "serial", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private List<FinanceIncreaseCorporateDepositRequestEntity> corporateIncreases;

    @OneToMany(mappedBy = "serial", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private List<FinanceSettlementUserDepositRequestEntity> settlementRequests;

    @OneToMany(mappedBy = "serial", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private List<InvoiceEntity> invoices;

    @ManyToMany(mappedBy = "Serials", fetch = FetchType.LAZY)
    @JsonIgnore
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
