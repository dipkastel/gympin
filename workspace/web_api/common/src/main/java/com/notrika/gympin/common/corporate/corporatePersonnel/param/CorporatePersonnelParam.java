package com.notrika.gympin.common.corporate.corporatePersonnel.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.param.BaseParam;
import com.notrika.gympin.common.corporate.corporate.param.CorporateParam;
import com.notrika.gympin.common.corporate.corporatePersonnel.enums.CorporatePersonnelRoleEnum;
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
public class CorporatePersonnelParam extends BaseParam<CorporatePersonnelParam> {

    @JsonProperty("Corporate")
    private CorporateParam corporate;

    @JsonProperty("PhoneNumber")
    private String phoneNumber;

    @JsonProperty("Role")
    private CorporatePersonnelRoleEnum role;


}
