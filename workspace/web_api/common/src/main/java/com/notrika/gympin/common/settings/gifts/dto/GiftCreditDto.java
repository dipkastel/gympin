package com.notrika.gympin.common.settings.gifts.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.corporate.corporate.dto.CorporateDto;
import com.notrika.gympin.common.settings.gifts.enums.GiftCreditStatusEnum;
import com.notrika.gympin.common.user.user.dto.UserDto;
import com.notrika.gympin.common.util._base.dto.BaseDto;
import com.notrika.gympin.common.util._base.dto.BaseDtoWithCreateUpdate;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class GiftCreditDto extends BaseDtoWithCreateUpdate<GiftCreditDto> {

    @JsonProperty("Name")
    private String name;

    @JsonProperty("Code")
    private String code;

    @JsonProperty("RegisterCode")
    private String registerCode;

    @JsonProperty("CanRegister")
    private Boolean canRegister;

    @JsonProperty("Amount")
    private BigDecimal amount;

    @JsonProperty("ExpireDate")
    private Date expireDate;

    @JsonProperty("CreditExpireDate")
    private Date creditExpireDate;

    @JsonProperty("Status")
    private GiftCreditStatusEnum status;

    @JsonProperty("User")
    private UserDto user;

    @JsonProperty("Corporate")
    private CorporateDto corporate;

}
