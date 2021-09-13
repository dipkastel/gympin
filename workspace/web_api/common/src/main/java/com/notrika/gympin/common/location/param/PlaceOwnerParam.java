package com.notrika.gympin.common.location.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.BaseParam;
import com.notrika.gympin.common.user.enums.UserRole;
import com.notrika.gympin.common.user.param.UserParam;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class PlaceOwnerParam extends BaseParam<PlaceOwnerParam> {

    @JsonProperty("Place")
    private PlaceParam placeParam;

    @JsonProperty("User")
    private UserParam userParam;

    @JsonProperty("UserRole")
    private UserRole userRole;


}
