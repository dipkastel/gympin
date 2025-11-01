package com.notrika.gympin.common.settings.notification.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.user.user.dto.UserDto;
import com.notrika.gympin.common.util._base.dto.BaseDto;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.Date;
import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class NotificationBasePayload {

    @JsonProperty("data")
    private NotificationPayloadData data;

    @JsonProperty("audience")
    private List<Long> audience;

    @JsonProperty("appName")
    private String appName;

}
