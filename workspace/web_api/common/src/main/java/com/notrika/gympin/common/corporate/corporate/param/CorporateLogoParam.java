package com.notrika.gympin.common.corporate.corporate.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.param.BaseParam;
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
public class CorporateLogoParam extends BaseParam<CorporateLogoParam> {

    @JsonProperty("CorporateId")
    private Long corporateId;

    @JsonProperty("MultimediaId")
    private Long multimediaId;
}
