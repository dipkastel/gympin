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

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "global_leger_item")
public class GlobalLegerItemEntity extends BaseEntityWithCreateUpdate<GlobalLegerEntity> {

    @ManyToOne
    private DocumentEntity document;

    //    @Column(name = "transaction_date")
    //    private Date transactionDate;

    //    @Column(name = "description")
    //    private String description;

    @Column(name = "transaction_type")
    private DebtorCreditor transactionType;

    //    private

}
