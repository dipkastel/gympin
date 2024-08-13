package com.notrika.gympin.persistence.entity.finance.corporate;

import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.corporate.CorporateEntity;
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
@Table(name = "financeCorporate")
public class FinanceCorporateEntity extends BaseEntityWithCreateUpdate<FinanceCorporateEntity> {

    @Column(name = "totalDeposit", nullable = false, columnDefinition = "decimal(19,2) default 0")
    private BigDecimal totalDeposit;

    @Column(name = "totalCredits", nullable = false, columnDefinition = "decimal(19,2) default 0")
    private BigDecimal totalCredits;

    @OneToMany(mappedBy = "financeCorporate",fetch = FetchType.LAZY)
    @ToString.Exclude
    private List<FinanceCorporateTransactionEntity> corporateFinance;

    @OneToOne
    @JoinColumn(name = "corporateId", referencedColumnName = "id")
    @ToString.Exclude
    private CorporateEntity corporate;
 
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        FinanceCorporateEntity that = (FinanceCorporateEntity) o;
        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
