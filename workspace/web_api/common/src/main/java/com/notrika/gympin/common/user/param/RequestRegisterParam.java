package com.notrika.gympin.common.user.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
public class RequestRegisterParam {

    @JsonProperty("fullName")
    private String fullName;

    @JsonProperty("placeName")
    private String placeName;

    @JsonProperty("PhoneNumber")
    private String phoneNumber;
}
