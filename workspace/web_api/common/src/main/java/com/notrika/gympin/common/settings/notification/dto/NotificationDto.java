package com.notrika.gympin.common.settings.notification.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.dto.BaseDto;
import com.notrika.gympin.common.user.user.dto.UserDto;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.Date;
import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class NotificationDto extends BaseDto<NotificationDto> {

    @JsonProperty("TargetUsers")
    private List<UserDto> targetUsers;

    @JsonProperty("Notif")
    private String notif;

    @JsonProperty("ExpiredDate")
    private Date expiredDate;

}
