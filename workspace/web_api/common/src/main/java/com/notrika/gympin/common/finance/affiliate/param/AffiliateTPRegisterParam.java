package com.notrika.gympin.common.finance.affiliate.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.user.user.enums.Gender;
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
public class AffiliateTPRegisterParam extends BaseParam<AffiliateTPRegisterParam> {


    @JsonProperty("UserPhoneNumber")
    private String userPhoneNumber;

    @JsonProperty("UserFullName")
    private String userFullName;

    @JsonProperty("UserNationalCode")
    private String userNationalCode;

    @JsonProperty("UserBirthday")
    private Date userBirthday;

    @JsonProperty("UserGender")
    private Gender userGender;

    @JsonProperty("UserEmail")
    private String userEmail;


    @JsonProperty("CorporateCode")
    private String corporateCode;

    @JsonProperty("CreditAmount")
    private BigDecimal amount;

    @JsonProperty("CreditExpire")
    private Date CreditExpire;

}
