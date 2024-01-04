package com.notrika.gympin.common.finance.gateway.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.finance.transaction.enums.GatewayType;
import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
import com.notrika.gympin.common.util._base.dto.BaseDtoWithCreateUpdate;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class BankStaff extends BaseDtoWithCreateUpdate<BankStaff> {

    @JsonProperty("BankName")
    private String bankName;

    @JsonProperty("Url")
    private String url;

    @JsonProperty("Reference")
    private String reference;
}
