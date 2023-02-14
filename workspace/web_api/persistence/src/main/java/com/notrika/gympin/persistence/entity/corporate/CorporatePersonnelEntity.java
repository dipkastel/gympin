package com.notrika.gympin.persistence.entity.corporate;

import com.notrika.gympin.common.corporate.corporatePersonnel.enums.CorporatePersonnelRoleEnum;
import com.notrika.gympin.persistence.entity.BaseEntity;
import com.notrika.gympin.persistence.entity.transaction.TransactionEntity;
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
    @JoinColumn(name = "corporate_id")
    private CorporateEntity corporate;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private CorporatePersonnelRoleEnum role;

    @Column( name = "CreditBalance",nullable = false)
    private BigDecimal creditBalance = BigDecimal.ZERO;

    @OneToMany(mappedBy = "corporatePersonnel")
    @ToString.Exclude
    private List<CorporatePersonnelCreditEntity> credits;

    @OneToMany(mappedBy = "corporatePersonnel")
    @ToString.Exclude
    private List<TransactionEntity> transactions;

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
