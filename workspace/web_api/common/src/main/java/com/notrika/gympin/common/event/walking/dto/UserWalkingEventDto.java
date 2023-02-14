package com.notrika.gympin.common.event.walking.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.dto.BaseDto;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class UserWalkingEventDto extends BaseDto<UserWalkingEventDto> {

    @JsonProperty("OwnedEvents")
    private List<WalkingEventDto> ownedEvents;

    @JsonProperty("ParticipatedEvents")
    private List<WalkingEventDto> participatedEvents;

}
