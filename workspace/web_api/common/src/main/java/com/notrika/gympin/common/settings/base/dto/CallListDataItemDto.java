package com.notrika.gympin.common.settings.base.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.user.user.dto.UserDto;
import com.notrika.gympin.common.util._base.param.BaseParam;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.util.Date;
import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
public class CallListDataItemDto  {

    @JsonProperty("id")
    private String id;
    @JsonProperty("fromNumber")
    private String fromNumber;
    @JsonProperty("toNumber")
    private String toNumber;
    @JsonProperty("startTime")
    private Date startTime;
    @JsonProperty("endTime")
    private Date endTime;
    @JsonProperty("duration")
    private String duration;
    @JsonProperty("extension")
    private String extension;
    @JsonProperty("recordingId")
    private String recordingId;
    @JsonProperty("type")
    private String type;
    @JsonProperty("reportDispositionType")
    private String reportDispositionType;
    @JsonProperty("callSource")
    private String callSource;
    @JsonProperty("direction")
    private String direction;
    @JsonProperty("waitingTime")
    private String waitingTime;
    @JsonProperty("totalCallTime")
    private String totalCallTime;
    @JsonProperty("involvedServices")
    private List<String> involvedServices;
    @JsonProperty("User")
    private UserDto user;


}
