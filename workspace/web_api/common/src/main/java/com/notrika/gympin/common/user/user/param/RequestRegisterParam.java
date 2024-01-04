package com.notrika.gympin.common.user.user.param;

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

    @JsonProperty("FullName")
    private String fullName;

    @JsonProperty("Text")
    private String text;

    @JsonProperty("PhoneNumber")
    private String phoneNumber;
}
