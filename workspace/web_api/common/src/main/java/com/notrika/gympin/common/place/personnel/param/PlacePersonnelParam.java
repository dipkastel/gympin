package com.notrika.gympin.common.place.personnel.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.place.personnel.enums.PlacePersonnelRoleEnum;
import com.notrika.gympin.common.util._base.param.BaseParam;
import com.notrika.gympin.common.place.place.param.PlaceParam;
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
public class PlacePersonnelParam extends BaseParam<PlacePersonnelParam> {

    @JsonProperty("Place")
    private PlaceParam place;

    @JsonProperty("PhoneNumber")
    private String PhoneNumber;

    @JsonProperty("UserRole")
    private PlacePersonnelRoleEnum userRole;

    @JsonProperty("CommissionFee")
    private Double commissionFee;


}
