package com.notrika.gympin.common.settings.notification.param;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.settings.notification.enums.NotificationSubscriberStatus;
import com.notrika.gympin.common.user.user.param.UserParam;
import com.notrika.gympin.common.util._base.param.BaseParam;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.util.Date;
import java.util.List;

@Data
@SuperBuilder
@AllArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class NotificationSubscriptionParam extends BaseParam<NotificationSubscriptionParam> {

    @JsonProperty("endpoint")
    private String endpoint;

    @JsonProperty("p256dh")
    private String p256dh;

    @JsonProperty("auth")
    private String auth;

    @JsonProperty("appName")
    private String appName;

    @JsonProperty("user")
    private UserParam user;

    @JsonProperty("status")
    private NotificationSubscriberStatus status;

}
