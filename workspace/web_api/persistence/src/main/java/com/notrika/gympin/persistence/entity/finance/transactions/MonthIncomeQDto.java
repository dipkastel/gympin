package com.notrika.gympin.persistence.entity.finance.transactions;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.dto.BaseDtoWithCreateUpdate;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.Date;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class MonthIncomeQDto extends BaseDtoWithCreateUpdate<MonthIncomeQDto> {

    private BigDecimal amount;

    private Date monthName;


    public MonthIncomeQDto(BigDecimal _amount, Date _monthName) {
        this.amount = _amount;
        this.monthName = _monthName;
    }
}
