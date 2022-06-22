package com.notrika.gympin.common.user.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.BaseDto;
import com.notrika.gympin.common.event.BaseEventDto;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class RateableUsersDto extends BaseDto<RateableUsersDto> {

    @JsonProperty("Event")
    private BaseEventDto<?> event;

    @JsonProperty("Users")
    private List<UserDto> users;

}
