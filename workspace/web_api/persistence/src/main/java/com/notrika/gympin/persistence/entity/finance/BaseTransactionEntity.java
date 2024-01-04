package com.notrika.gympin.persistence.entity.finance;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.notrika.gympin.common.finance.transaction.enums.TransactionBaseType;
import com.notrika.gympin.common.finance.transaction.enums.TransactionStatus;
import com.notrika.gympin.common.finance.transaction.enums.TransactionType;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
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
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "financeTransaction")
public class BaseTransactionEntity<T> extends BaseEntityWithCreateUpdate<T> {


    @Column(name = "amount")
    private BigDecimal amount;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private TransactionStatus transactionStatus;

    @Column(name = "type", nullable = false)
    @Enumerated(EnumType.STRING)
    private TransactionBaseType transactionType;

    @Column(name = "isChecked", nullable = false, columnDefinition = "boolean default false")
    private Boolean isChecked = false;

    @Column(name = "latestBalance", nullable = false, columnDefinition = "decimal(19,2) default 0")
    private BigDecimal latestBalance;

    @Column(name = "description", length = 250)
    private String description;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        BaseTransactionEntity that = (BaseTransactionEntity) o;
        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
