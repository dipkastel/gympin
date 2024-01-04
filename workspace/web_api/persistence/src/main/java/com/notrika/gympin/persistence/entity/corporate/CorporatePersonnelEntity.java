package com.notrika.gympin.persistence.entity.corporate;

import com.notrika.gympin.common.corporate.corporatePersonnel.enums.CorporatePersonnelRoleEnum;
import com.notrika.gympin.persistence.entity.BaseEntity;
import com.notrika.gympin.persistence.entity.finance.corporate.CorporatePersonnelCreditEntity;
import com.notrika.gympin.persistence.entity.finance.corporate.FinanceCorporateTransactionEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import lombok.*;
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
@Table(name = "corporatePersonel")
public class CorporatePersonnelEntity extends BaseEntity<CorporatePersonnelEntity> {

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "corporateId")
    private CorporateEntity corporate;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "personnelUserId")
    private UserEntity user;


    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "personelGroupId")
    private CorporatePersonnelGroupEntity personnelGroup;

    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private CorporatePersonnelRoleEnum role;

    @Column( name = "CreditBalance",nullable = false)
    private BigDecimal creditBalance = BigDecimal.ZERO;

    @OneToMany(mappedBy = "corporatePersonnel",fetch = FetchType.LAZY)
    @ToString.Exclude
    private List<CorporatePersonnelCreditEntity> credits;

    @OneToMany(mappedBy = "corporatePersonnel",fetch = FetchType.LAZY)
    @ToString.Exclude
    private List<FinanceCorporateTransactionEntity> transactions;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        CorporatePersonnelEntity that = (CorporatePersonnelEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
