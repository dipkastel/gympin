package com.notrika.gympin.persistence.entity.finance.user;

import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.user.UserEntity;
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
@Table(name = "financeUser")
public class FinanceUserEntity extends BaseEntityWithCreateUpdate<FinanceUserEntity> {

    @Column(name = "totalDeposit", nullable = false, columnDefinition = "decimal(19,2) default 0")
    private BigDecimal totalDeposit;

    @OneToMany(mappedBy = "financeUser",fetch = FetchType.LAZY)
    @ToString.Exclude
    private List<FinanceUserTransactionEntity> transactionsUser;

    @OneToOne(mappedBy = "financeUser",fetch = FetchType.LAZY)
    @ToString.Exclude
    private UserEntity user;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        FinanceUserEntity that = (FinanceUserEntity) o;
        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
