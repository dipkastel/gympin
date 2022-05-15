package com.notrika.gympin.common.event.general.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.BaseDto;
import com.notrika.gympin.common.event.BaseEventDto;
import com.notrika.gympin.common.user.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class EventParticipantDto extends BaseDto<EventParticipantDto> {

    @JsonProperty("Event")
    private BaseEventDto event;

    @JsonProperty("User")
    private UserDto user;

}
