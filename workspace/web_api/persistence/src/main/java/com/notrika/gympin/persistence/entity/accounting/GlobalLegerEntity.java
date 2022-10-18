package com.notrika.gympin.persistence.entity.accounting;

import com.notrika.gympin.common.accounting.account.DebtorCreditor;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "global_leger")
public class GlobalLegerEntity extends BaseEntityWithCreateUpdate<GlobalLegerEntity> {

    @ManyToOne
    private AccountEntity account;

    @OneToMany
    @ToString.Exclude
    private List<GlobalLegerItemEntity> globalLegerItems;

    private BigDecimal totalAmount;

    private DebtorCreditor totalAmountNature;

}
