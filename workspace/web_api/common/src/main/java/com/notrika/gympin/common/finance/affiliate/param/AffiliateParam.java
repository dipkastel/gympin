package com.notrika.gympin.common.finance.affiliate.param;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.user.user.param.UserParam;
import com.notrika.gympin.common.util.ApplicationEnum;
import com.notrika.gympin.common.util._base.param.BaseParam;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;

@Data
@SuperBuilder
@AllArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class AffiliateParam extends BaseParam<AffiliateParam> {

    @JsonProperty("User")
    private UserParam user;

    @JsonProperty("CommissionFee")
    private Double commissionFee;

    @JsonProperty("Username")
    private String username;

    @JsonProperty("Password")
    private String password;

}
