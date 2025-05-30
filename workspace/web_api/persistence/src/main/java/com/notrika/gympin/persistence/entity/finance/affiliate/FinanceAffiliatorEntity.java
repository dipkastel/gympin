package com.notrika.gympin.persistence.entity.finance.affiliate;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.notrika.gympin.common.finance.affiliate.enums.AffiliatorStatus;
import com.notrika.gympin.common.user.user.enums.UserStatus;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.corporate.CorporateEntity;
import com.notrika.gympin.persistence.entity.finance.transactions.FinanceAffiliateTransactionEntity;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.place.PlaceGymEntity;
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

//wallet

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "financeAffiliator")
public class FinanceAffiliatorEntity extends BaseEntityWithCreateUpdate<FinanceAffiliatorEntity> {


    @OneToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private UserEntity user;

    @Column(name = "AffiliatorStatus")
    @Enumerated(EnumType.STRING)
    private AffiliatorStatus affiliatorStatus;

    @Column(name = "totalIncome", nullable = false, columnDefinition = "decimal(19,2) default 0")
    private BigDecimal income;

    @Column(name = "commissionFee")
    private Double commissionFee;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;


    @OneToMany(mappedBy = "affiliator", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private List<FinanceAffiliateTransactionEntity> affiliateTransactions;

    @OneToMany(mappedBy = "affiliator", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private List<PlaceGymEntity> places;

    @OneToMany(mappedBy = "affiliator", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private List<CorporateEntity> corporates;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        FinanceAffiliatorEntity that = (FinanceAffiliatorEntity) o;
        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
