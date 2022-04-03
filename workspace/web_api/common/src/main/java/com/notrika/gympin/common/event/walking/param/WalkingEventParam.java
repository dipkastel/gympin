package com.notrika.gympin.common.event.walking.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.event.BaseEventParam;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

import java.util.Date;

@Data
@SuperBuilder
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class WalkingEventParam extends BaseEventParam<WalkingEventParam> {

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

}