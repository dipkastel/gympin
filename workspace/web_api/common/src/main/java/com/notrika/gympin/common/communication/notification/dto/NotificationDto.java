package com.notrika.gympin.common.communication.notification.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.BaseDto;
import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.param.UserParam;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.Date;
import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class NotificationDto extends BaseDto<NotificationDto> {

    @JsonProperty("TargetUsers")
    private List<UserDto> targetUsers;

    @JsonProperty("Notif")
    private String notif;

    @JsonProperty("ExpiredDate")
    private Date expiredDate;

}
