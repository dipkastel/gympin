package com.notrika.gympin.common.corporate.corporate.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.param.BaseParam;
import com.notrika.gympin.common.corporate.corporate.enums.CorporateStatusEnum;
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
public class CorporateParam extends BaseParam<CorporateParam> {

    @JsonProperty("Name")
    private String name;

    @JsonProperty("Address")
    private String address;

    @JsonProperty("Status")
    private CorporateStatusEnum status;

}
