package com.notrika.gympin.common.settings.gifts.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.corporate.corporate.param.CorporateParam;
import com.notrika.gympin.common.settings.gifts.enums.GiftCreditStatusEnum;
import com.notrika.gympin.common.user.user.dto.UserDto;
import com.notrika.gympin.common.user.user.param.UserParam;
import com.notrika.gympin.common.util._base.param.BaseParam;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.Date;

@Data
@SuperBuilder
@AllArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class GiftCreditParam extends BaseParam<GiftCreditParam> {


    @JsonProperty("Name")
    private String name;

    @JsonProperty("Code")
    private String code;

    @JsonProperty("Count")
    private Short count;

    @JsonProperty("RegisterCode")
    private String registerCode;

    @JsonProperty("CanRegister")
    private Boolean canRegister;

    @JsonProperty("CheckCorporateDeposit")
    private Boolean checkCorporateDeposit;

    @JsonProperty("Amount")
    private BigDecimal amount;

    @JsonProperty("ExpireDate")
    private Date expireDate;

    @JsonProperty("CreditExpireDate")
    private Date creditExpireDate;

    @JsonProperty("Status")
    private GiftCreditStatusEnum status;

    @JsonProperty("User")
    private UserParam user;

    @JsonProperty("Corporate")
    private CorporateParam corporate;

}
