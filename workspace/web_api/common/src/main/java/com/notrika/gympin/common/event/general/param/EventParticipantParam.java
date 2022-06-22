package com.notrika.gympin.common.event.general.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.BaseParam;
import com.notrika.gympin.common.event.BaseEventParam;
import com.notrika.gympin.common.user.param.UserParam;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@AllArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class EventParticipantParam extends BaseParam<EventParticipantParam> {

    @JsonProperty("Event")
    private BaseEventParam event;

    @JsonProperty("User")
    private UserParam user;

}
