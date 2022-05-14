package com.notrika.gympin.common.event.walking.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.event.BaseEventParam;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NonNull;
import lombok.experimental.SuperBuilder;

import java.util.Date;

@Data
@SuperBuilder
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class WalkingEventParam extends BaseEventParam<WalkingEventParam> {

    @JsonProperty("StartLatitude")
    @NonNull
    private double startLatitude;

    @JsonProperty("StartLongitude")
    @NonNull
    private double startLongitude;

    @JsonProperty("EndLatitude")
    @NonNull
    private double endLatitude;

    @JsonProperty("EndLongitude")
    @NonNull
    private double endLongitude;

    @JsonProperty("ParticipantCount")
    @NonNull
    private int participantCount;

    @JsonProperty("Address")
    private String address;

}