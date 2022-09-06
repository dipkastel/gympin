package com.notrika.gympin.persistence.entity.accounting;

import com.notrika.gympin.common.accounting.account.DebtorCreditor;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "account")
public class AccountEntity extends BaseEntityWithCreateUpdate<AccountEntity> {

    @Column(name = "account_code")
    private String accountCode;

    @Column(name = "serial")
    private Long serial;

    @Column(name = "open_date")
    private Date openDate;

    @Column(name = "account_nature")
    private DebtorCreditor accountNature;

    @Column(name = "balance")
    private BigDecimal balance;

    @Column(name = "balance_type")
    private DebtorCreditor balanceType;

    @Column(name = "description")
    private String description;

    @ManyToOne
    private AuditableEntitiesEntity auditableEntity;


}
