package com.notrika.gympin.common.purchased.purchasedSubscribe.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.param.BaseParam;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.util.Date;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class IncreaseExpireParam extends BaseParam<IncreaseExpireParam> {

    @JsonProperty("SubscribeId")
    private Long subscribeId;

    @JsonProperty("IncreaseDayCount")
    private int increaseDayCount;

    @JsonProperty("ChangeDate")
    private Date changeDate;

}
