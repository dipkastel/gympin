package com.notrika.gympin.common.place.personnel.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.param.BaseParam;
import com.notrika.gympin.common.place.enums.PlacePersonnelRole;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.user.enums.UserRole;
import com.notrika.gympin.common.user.param.UserParam;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class PlacePersonnelParam extends BaseParam<PlacePersonnelParam> {

    @JsonProperty("Place")
    private PlaceParam placeParam;

    @JsonProperty("PhoneNumber")
    private String PhoneNumber;

    @JsonProperty("UserRole")
    private PlacePersonnelRole userRole;


}
