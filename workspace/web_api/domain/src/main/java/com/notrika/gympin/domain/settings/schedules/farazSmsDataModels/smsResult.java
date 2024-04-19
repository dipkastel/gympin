package com.notrika.gympin.domain.settings.schedules.farazSmsDataModels;

import com.fasterxml.jackson.annotation.JsonProperty;

public class smsResult {

    @JsonProperty("status")
    public String status;
    @JsonProperty("code")
    public Integer code;
    @JsonProperty("errorMessage")
    public String errorMessage;
    @JsonProperty("data")
    public smsData data;

}
