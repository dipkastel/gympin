package com.notrika.gympin.persistence.entity.finance.corporate;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.notrika.gympin.common.corporate.corporatePersonnel.enums.CorporatePersonnelCreditStatusEnum;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.corporate.CorporatePersonnelEntity;
import com.notrika.gympin.persistence.entity.finance.FinanceSerialEntity;
import com.notrika.gympin.persistence.entity.finance.transactions.FinanceCorporatePersonnelCreditTransactionEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "financeCorporatePersonelCredit")
public class FinanceCorporatePersonnelCreditEntity extends BaseEntityWithCreateUpdate<FinanceCorporatePersonnelCreditEntity> {

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private CorporatePersonnelCreditStatusEnum status;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "corporatePersonnelId")
    @JsonIgnore
    @ToString.Exclude
    private CorporatePersonnelEntity corporatePersonnel;

    @Column(name = "creditAmount")
    private BigDecimal creditAmount;

    @Column(name = "expireDate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date ExpireDate;


    @OneToMany(mappedBy = "personnelCredit", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private List<FinanceCorporatePersonnelCreditTransactionEntity> transactions;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        FinanceCorporatePersonnelCreditEntity that = (FinanceCorporatePersonnelCreditEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
