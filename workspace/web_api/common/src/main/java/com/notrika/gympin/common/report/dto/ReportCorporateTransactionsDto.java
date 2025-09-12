package com.notrika.gympin.common.report.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.finance.serial.dto.SerialDto;
import com.notrika.gympin.common.finance.transaction.dto.CorporateTransactionDto;
import com.notrika.gympin.common.user.user.dto.UserDto;
import com.notrika.gympin.common.util._base.dto.BaseDto;
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
public class ReportCorporateTransactionsDto extends BaseDto<ReportCorporateTransactionsDto> {


    @JsonProperty("Serial")
    private String serial;

    @JsonProperty("Amount")
    private BigDecimal amount;

    @JsonProperty("LatestBalance")
    private BigDecimal latestBalance;

    @JsonProperty("Date")
    private Date date;

}
