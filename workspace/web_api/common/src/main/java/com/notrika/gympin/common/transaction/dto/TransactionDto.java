package com.notrika.gympin.common.transaction.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.dto.BaseDtoWithCreateUpdate;
import com.notrika.gympin.common.corporate.corporate.dto.CorporateDto;
import com.notrika.gympin.common.corporate.corporate.enums.CorporateTransactionTypesEnum;
import com.notrika.gympin.common.corporate.corporatePersonnel.dto.CorporatePersonnelDto;
import com.notrika.gympin.common.place.place.dto.PlaceDto;
import com.notrika.gympin.common.transaction.enums.TransactionStatus;
import com.notrika.gympin.common.transaction.enums.TransactionType;
import com.notrika.gympin.common.user.dto.UserDto;
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
public class TransactionDto extends BaseDtoWithCreateUpdate<TransactionDto> {

    @JsonProperty("Amount")
    private BigDecimal amount;

    @JsonProperty("Balance")
    private BigDecimal balance;

    @JsonProperty("TransactionType")
    private TransactionType TransactionType;

    @JsonProperty("TransactionStatus")
    private TransactionStatus transactionStatus;

    @JsonProperty("Serial")
    private String serial;

    @JsonProperty("IsChecked")
    private Boolean isChecked;

    @JsonProperty("Description")
    private String description;

    @JsonProperty("Place")
    private PlaceDto place;

    @JsonProperty("Corporate")
    private CorporateDto corporate;

    @JsonProperty("User")
    private UserDto user;


    @JsonProperty("CorporatePersonnel")
    private CorporatePersonnelDto corporatePersonnel;




}
