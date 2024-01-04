package com.notrika.gympin.persistence.entity.finance.Increase;

import com.notrika.gympin.common.finance.IncreaseUserDeposit.enums.DepositStatus;
import com.notrika.gympin.common.finance.transaction.enums.GatewayType;
import com.notrika.gympin.common.ticket.buyable.enums.BuyableType;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.corporate.CorporateEntity;
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
@Table(name = "financeIncreaseCorporateDeposit")
public class FinanceIncreaseCorporateDepositEntity extends BaseEntityWithCreateUpdate<FinanceIncreaseCorporateDepositEntity> {

    @Column(name = "amount", nullable = false, columnDefinition = "decimal(19,2) default 0")
    private BigDecimal amount;

    @ManyToOne
    @ToString.Exclude
    private CorporateEntity corporate;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "serialId")
    private FinanceSerialEntity serial;

    @Column(name = "depositStatus", nullable = false)
    @Enumerated(EnumType.STRING)
    private DepositStatus depositStatus;

    @Column(name = "gatewayType")
    @Enumerated(EnumType.STRING)
    private GatewayType gatewayType;

    @Column(name = "refrence")
    private String refrence;

    @Column(name = "description")
    private String description;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        FinanceIncreaseCorporateDepositEntity that = (FinanceIncreaseCorporateDepositEntity) o;
        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
