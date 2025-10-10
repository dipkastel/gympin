package com.notrika.gympin.common.corporate.corporatePersonnel.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.finance.serial.param.SerialParam;
import com.notrika.gympin.common.util._base.param.BaseParam;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class CorporatePersonnelCateringAccessParam extends BaseParam<CorporatePersonnelCateringAccessParam> {

    @JsonProperty("CorporateId")
    private Long corporateId;

    @JsonProperty("PersonnelId")
    private Long personnelId;

    @JsonProperty("CateringId")
    private Long cateringId;

    @JsonProperty("Access")
    private Boolean access;


}
