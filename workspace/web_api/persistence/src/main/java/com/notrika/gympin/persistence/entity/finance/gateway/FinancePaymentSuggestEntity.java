package com.notrika.gympin.persistence.entity.finance.gateway;

import com.notrika.gympin.common.finance.transaction.enums.GatewayType;
import com.notrika.gympin.common.util.ApplicationEnum;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.multimedia.MultimediaEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "financePaymentSuggest")
public class FinancePaymentSuggestEntity extends BaseEntityWithCreateUpdate<FinancePaymentSuggestEntity> {



    @Column(name = "application")
    @Enumerated(EnumType.STRING)
    private ApplicationEnum application;

    @Column(name = "amount")
    private BigDecimal amount;

    @Column(name = "priority")
    private Short priority;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        FinancePaymentSuggestEntity that = (FinancePaymentSuggestEntity) o;
        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
