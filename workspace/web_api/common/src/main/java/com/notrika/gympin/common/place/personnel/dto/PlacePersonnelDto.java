package com.notrika.gympin.common.place.personnel.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.dto.BaseDto;
import com.notrika.gympin.common.place.enums.PlacePersonnelRole;
import com.notrika.gympin.common.place.place.dto.PlaceDto;
import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.enums.UserRole;
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
public class PlacePersonnelDto extends BaseDto<PlacePersonnelDto> {

    @JsonProperty("Place")
    private PlaceDto placeDto;

    @JsonProperty("User")
    private UserDto userDto;

    @JsonProperty("UserRole")
    private PlacePersonnelRole userRole;

    @JsonProperty("UserAccess")
    private List<PlacePersonnelAccessDto> placePersonnelAccess;
}
