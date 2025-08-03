package com.notrika.gympin.common.settings.service.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.param.BaseParam;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.util.Date;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class ServiceByDateParam extends BaseParam<ServiceByDateParam> {

    @JsonProperty("CorporateId")
    public Long corporateId;

    @JsonProperty("FromDate")
    public Date fromDate;

    @JsonProperty("ToDate")
    public Date toDate;
}
