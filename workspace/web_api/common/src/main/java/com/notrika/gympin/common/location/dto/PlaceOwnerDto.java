package com.notrika.gympin.common.location.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.BaseDto;
import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.enums.UserRoles;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class PlaceOwnerDto extends BaseDto<PlaceOwnerDto> {

    @JsonProperty("Place")
    private PlaceDto placeDto;

    @JsonProperty("User")
    private UserDto userDto;

    @JsonProperty("UserRole")
    private UserRoles userRole;
}
