package com.notrika.gympin.common.finance.settlement.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.finance.IncreaseUserDeposit.enums.DepositStatus;
import com.notrika.gympin.common.finance.serial.dto.SerialDto;
import com.notrika.gympin.common.finance.settlement.enums.SettlementStatus;
import com.notrika.gympin.common.user.user.dto.UserDto;
import com.notrika.gympin.common.util._base.dto.BaseDtoWithCreateUpdate;
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
public class FinanceSettlementUserDepositDto extends BaseDtoWithCreateUpdate<FinanceSettlementUserDepositDto> {

    @JsonProperty("User")
    private UserDto userDto;

    @JsonProperty("Amount")
    BigDecimal amount;

    @JsonProperty("Serial")
    SerialDto serial;

    @JsonProperty("SettlementStatus")
    SettlementStatus settlementStatus;

    @JsonProperty("Description")
    String description;

}
