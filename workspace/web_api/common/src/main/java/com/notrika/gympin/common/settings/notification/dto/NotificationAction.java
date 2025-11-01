package com.notrika.gympin.common.settings.notification.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.dto.BaseDto;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class NotificationAction  {

    @JsonProperty("title")
    private String title;

    @JsonProperty("action")
    private String action;

    @JsonProperty("icon")
    private String icon;

    @JsonProperty("placeholder")
    private String placeholder;

    @JsonProperty("type")
    private String type;

    @JsonProperty("data")
    private String data;



}
