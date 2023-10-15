package com.notrika.gympin.common.corporate.corporatePersonnel.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.param.BaseParam;
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
public class CorporatePersonnelCategoryParam extends BaseParam<CorporatePersonnelCategoryParam> {

    @JsonProperty("Name")
    private String name;

    @JsonProperty("CorporateId")
    private Long corporateId;

}
