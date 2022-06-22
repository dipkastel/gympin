package com.notrika.gympin.common.event.walking.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.event.BaseEventParam;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@AllArgsConstructor
@ToString
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