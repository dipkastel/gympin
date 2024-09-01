package com.notrika.gympin.persistence.entity.corporate;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.notrika.gympin.common.corporate.corporatePersonnel.enums.CorporatePersonnelRoleEnum;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.finance.transactions.FinanceCorporateTransactionEntity;
import com.notrika.gympin.persistence.entity.finance.corporate.FinanceCorporatePersonnelCreditEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "corporatePersonel")
public class CorporatePersonnelEntity extends BaseEntityWithCreateUpdate<CorporatePersonnelEntity> {

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "corporateId")
    @JsonIgnore
    @ToString.Exclude
    private CorporateEntity corporate;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "personnelUserId")
    @JsonIgnore
    @ToString.Exclude
    private UserEntity user;


    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "personelGroupId")
    @JsonIgnore
    @ToString.Exclude
    private CorporatePersonnelGroupEntity personnelGroup;

    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private CorporatePersonnelRoleEnum role;

    @OneToMany(mappedBy = "corporatePersonnel", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private List<FinanceCorporatePersonnelCreditEntity> credits;


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
