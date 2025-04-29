package com.notrika.gympin.common.finance.affiliate.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.corporate.corporate.param.CorporateParam;
import com.notrika.gympin.common.finance.affiliate.enums.AffiliatorStatus;
import com.notrika.gympin.common.user.user.param.UserParam;
import com.notrika.gympin.common.util._base.param.BaseParam;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@AllArgsConstructor
@ToString
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class AffiliateAddCorporateParam extends BaseParam<AffiliateAddCorporateParam> {

    @JsonProperty("Corporate")
    private CorporateParam corporate;

}
