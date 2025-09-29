package com.notrika.gympin.common.finance.IncreaseUserDeposit.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.finance.IncreaseUserDeposit.enums.DepositStatus;
import com.notrika.gympin.common.finance.serial.dto.SerialDto;
import com.notrika.gympin.common.finance.transaction.enums.GatewayType;
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
public class FinanceIncreaseUserDepositDto extends BaseDtoWithCreateUpdate<FinanceIncreaseUserDepositDto> {

    @JsonProperty("User")
    private UserDto user;

    @JsonProperty("Amount")
    BigDecimal amount;

    @JsonProperty("Serial")
    SerialDto serial;

    @JsonProperty("DepositStatus")
    DepositStatus depositStatus;

    @JsonProperty("Description")
    String description;

    @JsonProperty("Refrence")
    String refrence;

    @JsonProperty("RefrenceCode")
    String refrenceCode;

    @JsonProperty("SerialDescription")
    String serialDescription;

    @JsonProperty("GatewayType")
    GatewayType gatewayType;

}
