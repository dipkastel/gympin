package com.notrika.gympin.common.finance.transaction.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.finance.serial.dto.SerialDto;
import com.notrika.gympin.common.finance.transaction.enums.TransactionCorporateType;
import com.notrika.gympin.common.finance.transaction.enums.TransactionStatus;
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
public class ExportCorporateTicketsDto extends BaseDtoWithCreateUpdate<ExportCorporateTicketsDto> {

    @JsonProperty("UserName")
    private String userName;

    @JsonProperty("Amount")
    private BigDecimal amount;

    @JsonProperty("Date")
    private Date date;

    @JsonProperty("Status")
    private String status;

    @JsonProperty("TicketName")
    private String ticketName;

    @JsonProperty("GymName")
    private String gymName;

}
