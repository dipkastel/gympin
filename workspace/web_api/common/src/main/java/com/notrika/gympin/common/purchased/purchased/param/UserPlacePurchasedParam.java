package com.notrika.gympin.common.purchased.purchased.param;

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
public class UserPlacePurchasedParam extends BaseParam<UserPlacePurchasedParam> {

    @JsonProperty("UserId")
    private Long userId;

    @JsonProperty("PlaceId")
    private Long placeId;

}
