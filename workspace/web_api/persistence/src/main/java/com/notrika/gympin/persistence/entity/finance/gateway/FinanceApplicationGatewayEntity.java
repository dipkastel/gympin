package com.notrika.gympin.persistence.entity.finance.gateway;

import com.notrika.gympin.common.util.ApplicationEnum;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
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
@Table(name = "financeApplicationGateway")
public class FinanceApplicationGatewayEntity extends BaseEntityWithCreateUpdate<FinanceApplicationGatewayEntity> {

    @Column(name = "application")
    @Enumerated(EnumType.STRING)
    private ApplicationEnum application;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "gatewayId")
    private FinanceGatewayEntity gateway;

    @Column(name = "isDefault")
    private Boolean isDefault;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        FinanceApplicationGatewayEntity that = (FinanceApplicationGatewayEntity) o;
        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
