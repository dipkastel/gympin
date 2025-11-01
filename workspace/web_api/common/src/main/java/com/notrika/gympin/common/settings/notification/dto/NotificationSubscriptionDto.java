package com.notrika.gympin.common.settings.notification.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.settings.notification.enums.NotificationSubscriberStatus;
import com.notrika.gympin.common.user.user.dto.UserDto;
import com.notrika.gympin.common.user.user.param.UserParam;
import com.notrika.gympin.common.util._base.dto.BaseDto;
import com.notrika.gympin.common.util._base.param.BaseParam;
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
public class NotificationSubscriptionDto extends BaseDto<NotificationSubscriptionDto> {

    @JsonProperty("endpoint")
    private String endpoint;

    @JsonProperty("p256dh")
    private String p256dh;

    @JsonProperty("auth")
    private String auth;

    @JsonProperty("appName")
    private String appName;

    @JsonProperty("user")
    private UserDto user;

    @JsonProperty("status")
    private NotificationSubscriberStatus status;

}
