package com.notrika.gympin.common.user.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.param.BaseParam;
import com.notrika.gympin.common.util.ApplicationEnum;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class UserSendSmsParam extends BaseParam<UserSendSmsParam> {

    @JsonProperty("PhoneNumber")
    private String phoneNumber;

    @JsonProperty("Application")
    private ApplicationEnum application;

}
