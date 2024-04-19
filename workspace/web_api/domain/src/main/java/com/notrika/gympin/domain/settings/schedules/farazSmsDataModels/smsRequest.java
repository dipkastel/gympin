package com.notrika.gympin.domain.settings.schedules.farazSmsDataModels;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Map;

public class smsRequest {

    @JsonProperty("code")
    public String code;
    @JsonProperty("sender")
    public String sender;
    @JsonProperty("recipient")
    public String recipient;
    @JsonProperty("variable")
    public Map<String,String> variable;

}
