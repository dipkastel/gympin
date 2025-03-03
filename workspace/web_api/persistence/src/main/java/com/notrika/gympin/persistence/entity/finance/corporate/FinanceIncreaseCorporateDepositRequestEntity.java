package com.notrika.gympin.persistence.entity.finance.corporate;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.notrika.gympin.common.finance.IncreaseUserDeposit.enums.DepositStatus;
import com.notrika.gympin.common.finance.transaction.enums.GatewayType;
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
public class FinanceIncreaseCorporateDepositRequestEntity extends BaseEntityWithCreateUpdate<FinanceIncreaseCorporateDepositRequestEntity> {

    @Column(name = "amount", nullable = false, columnDefinition = "decimal(19,2) default 0")
    private BigDecimal amount;

    @ManyToOne
    @JsonIgnore
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

    @Column(name = "requestInvoice", nullable = false, columnDefinition = "boolean default false")
    private Boolean requestInvoice;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        FinanceIncreaseCorporateDepositRequestEntity that = (FinanceIncreaseCorporateDepositRequestEntity) o;
        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
