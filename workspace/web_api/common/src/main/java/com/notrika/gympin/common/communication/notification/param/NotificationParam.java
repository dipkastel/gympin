package com.notrika.gympin.common.communication.notification.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.BaseParam;
import com.notrika.gympin.common.user.param.UserParam;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

import java.util.Date;
import java.util.List;

@Data
@SuperBuilder
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class NotificationParam extends BaseParam<NotificationParam> {

    @JsonProperty("TargetUsers")
    private List<UserParam> targetUsers;

    @JsonProperty("Notif")
    private String notif;

    @JsonProperty("ExpiredDate")
    private Date expiredDate;

}
