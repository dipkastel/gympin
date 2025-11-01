package com.notrika.gympin.common.settings.notification.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.dto.BaseDto;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class NotificationPayloadData  {

    @JsonProperty("title")
    private String title;

    @JsonProperty("body")
    private String body;

    @JsonProperty("icon")
    private String icon;

    @JsonProperty("data")
    private String data;

    @JsonProperty("tag")
    private String tag;

    @JsonProperty("badge")
    private String badge;

    @JsonProperty("lang")
    private String lang = "fa-IR";

    @JsonProperty("dir")
    private String dir = "rtl";

    @JsonProperty("image")
    private String image;

    @JsonProperty("timestamp")
    private Long timestamp;

    @JsonProperty("requireInteraction")
    private Boolean requireInteraction = false;

    @JsonProperty("renotify")
    private Boolean renotify = true;

    @JsonProperty("silent")
    private Boolean silent = false;

    @JsonProperty("actions")
    private List<NotificationAction> actions ;


}
