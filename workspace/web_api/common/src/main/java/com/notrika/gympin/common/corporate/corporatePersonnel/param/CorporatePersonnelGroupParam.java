package com.notrika.gympin.common.corporate.corporatePersonnel.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.param.BaseParam;
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
public class CorporatePersonnelGroupParam extends BaseParam<CorporatePersonnelGroupParam> {

    @JsonProperty("Name")
    private String name;

    @JsonProperty("CorporateId")
    private Long corporateId;

}
