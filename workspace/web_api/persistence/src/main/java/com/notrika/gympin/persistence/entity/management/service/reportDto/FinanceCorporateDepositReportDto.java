package com.notrika.gympin.persistence.entity.management.service.reportDto;

import com.notrika.gympin.persistence.entity.finance.FinanceSerialEntity;
import com.notrika.gympin.persistence.entity.finance.transactions.FinanceCorporateTransactionEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
@ToString
public class FinanceCorporateDepositReportDto {
    private Date date;
    BigDecimal amount;
    BigDecimal latestBalance;
    private String serial;

    public FinanceCorporateDepositReportDto(Date date, BigDecimal amount,BigDecimal latestBalance,String serial) {
        this.date = date;
        this.amount = amount;
        this.latestBalance = latestBalance;
        this.serial = serial;
    }
}
