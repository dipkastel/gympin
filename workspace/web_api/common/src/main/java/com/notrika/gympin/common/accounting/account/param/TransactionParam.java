package com.notrika.gympin.common.accounting.account.param;

import com.notrika.gympin.common.BaseParam;
import com.notrika.gympin.common.accounting.account.enums.TransactionType;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class TransactionParam extends BaseParam<TransactionParam> {

    private AccountParam fromAccount;

    private AccountParam toAccount;

    private BigDecimal amount;

    private TransactionType transactionType;

    private String description;

}
