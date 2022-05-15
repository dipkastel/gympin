package com.notrika.gympin.common.event.walking.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.event.BaseEventDto;
import com.notrika.gympin.common.sport.dto.SportDto;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.Date;

@Data
@ToString
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class WalkingEventDto extends BaseEventDto<WalkingEventDto> {

    @JsonProperty("StartLatitude")
    private double startLatitude;

    @JsonProperty("StartLongitude")
    private double startLongitude;

    @JsonProperty("EndLatitude")
    private double endLatitude;

    @JsonProperty("EndLongitude")
    private double endLongitude;

    @JsonProperty("ParticipantCount")
    private int participantCount;

    @JsonProperty("StartDate")
    private Date startDate;

    @JsonProperty("Address")
    private String address;

}
