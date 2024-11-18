package com.notrika.gympin.common.place.place.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.place.place.enums.PlaceStatusEnum;
import com.notrika.gympin.common.settings.location.param.LocationParam;
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
public class PlaceContractSmsParam extends BaseParam<PlaceContractSmsParam> {

    @JsonProperty("PlaceId")
    private Long placeId;

    @JsonProperty("UserId")
    private Long userId;

    @JsonProperty("CommissionFee")
    private Short commissionFee;

}
