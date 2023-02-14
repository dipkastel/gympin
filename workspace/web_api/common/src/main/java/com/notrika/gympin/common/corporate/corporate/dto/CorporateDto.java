package com.notrika.gympin.common.corporate.corporate.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.dto.BaseDtoWithCreateUpdate;
import com.notrika.gympin.common.corporate.corporate.enums.CorporateStatusEnum;
import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
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
public class CorporateDto extends BaseDtoWithCreateUpdate<CorporateDto> {

    @JsonProperty("Name")
    private String name;

    @JsonProperty("Address")
    private String address;

    @JsonProperty("Balance")
    private BigDecimal balance;

    @JsonProperty("Status")
    private CorporateStatusEnum status;

    @JsonProperty("Logo")
    private MultimediaDto logo;


}
