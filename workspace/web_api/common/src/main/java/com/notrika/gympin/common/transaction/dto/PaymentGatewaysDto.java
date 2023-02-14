package com.notrika.gympin.common.transaction.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.dto.BaseDtoWithCreateUpdate;
import com.notrika.gympin.common.corporate.corporate.dto.CorporateDto;
import com.notrika.gympin.common.corporate.corporatePersonnel.dto.CorporatePersonnelDto;
import com.notrika.gympin.common.place.place.dto.PlaceDto;
import com.notrika.gympin.common.transaction.enums.GatwayType;
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
public class PaymentGatewaysDto extends BaseDtoWithCreateUpdate<PaymentGatewaysDto> {

    @JsonProperty("Name")
    private String name;

    @JsonProperty("ImageUrl")
    private String imageUrl;

    @JsonProperty("IsDefault")
    private Boolean isDefault;

    @JsonProperty("GatewayType")
    private GatwayType gatewayType;

    @JsonProperty("Description")
    private String description;
}
