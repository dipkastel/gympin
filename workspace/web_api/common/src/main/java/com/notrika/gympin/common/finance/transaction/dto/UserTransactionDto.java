package com.notrika.gympin.common.finance.transaction.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.finance.serial.dto.SerialDto;
import com.notrika.gympin.common.finance.transaction.enums.TransactionStatus;
import com.notrika.gympin.common.place.place.dto.PlaceDto;
import com.notrika.gympin.common.purchased.purchased.dto.PurchasedDto;
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
public class UserTransactionDto extends BaseDtoWithCreateUpdate<UserTransactionDto> {

    @JsonProperty("Amount")
    private BigDecimal amount;

    @JsonProperty("TransactionStatus")
    private TransactionStatus transactionStatus;

    @JsonProperty("LatestBalance")
    private BigDecimal latestBalance;

    @JsonProperty("Serial")
    private SerialDto serial;

    @JsonProperty("IsChecked")
    private Boolean isChecked;

    @JsonProperty("Description")
    private String description;

    @JsonProperty("Place")
    private PlaceDto place;

    @JsonProperty("Purchased")
    private PurchasedDto purchased;

    @JsonProperty("FinanceUser")
    private FinanceUserDto financeUser;


}
