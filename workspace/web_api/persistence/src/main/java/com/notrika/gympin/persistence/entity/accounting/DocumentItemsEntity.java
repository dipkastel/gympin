package com.notrika.gympin.persistence.entity.accounting;

import com.notrika.gympin.common.accounting.account.DebtorCreditor;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.math.BigDecimal;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "document_items")
public class DocumentItemsEntity extends BaseEntityWithCreateUpdate<DocumentItemsEntity> {

    @ManyToOne
    private AccountEntity account;

    @Column(name = "transaction_type")
    private DebtorCreditor transactionType;

    @Column(name = "amount")
    private BigDecimal amount;

    @ManyToOne
    private DocumentEntity document;

}
