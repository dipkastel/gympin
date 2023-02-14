package com.notrika.gympin.common.user.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.param.BaseParam;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;

@Data
@SuperBuilder
@AllArgsConstructor
@ToString
public class UserCreditIncreaseParam {

        @JsonProperty("UserId")
        Long userID;

        @JsonProperty("Amount")
        BigDecimal amount;

}
