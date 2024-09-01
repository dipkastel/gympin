package com.notrika.gympin.persistence.entity.finance.user.requests;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.notrika.gympin.common.finance.settlement.enums.SettlementStatus;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.finance.FinanceSerialEntity;
import com.notrika.gympin.persistence.entity.finance.user.FinanceUserEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
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
@Table(name = "financeSettlementUserDeposit")
public class FinanceSettlementUserDepositRequestEntity extends BaseEntityWithCreateUpdate<FinanceSettlementUserDepositRequestEntity> {

    @Column(name = "amount", nullable = false, columnDefinition = "decimal(19,2) default 0")
    private BigDecimal amount;

    @Column(name = "settlementStatus")
    @Enumerated(EnumType.STRING)
    private SettlementStatus settlementStatus;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "serialId")
    private FinanceSerialEntity serial;

    @ManyToOne
    @JsonIgnore
    @ToString.Exclude
    private FinanceUserEntity financeUser;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        FinanceSettlementUserDepositRequestEntity that = (FinanceSettlementUserDepositRequestEntity) o;
        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
