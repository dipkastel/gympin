package com.notrika.gympin.common.support.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.param.BaseParam;
import com.notrika.gympin.common.support.enums.SupportMessageStatus;
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
public class SupportMessageParam extends BaseParam<SupportMessageParam> {

    @JsonProperty("SupportId")
    private Long supportId;

    @JsonProperty("Status")
    private SupportMessageStatus status;

    @JsonProperty("Message")
    private String messages;

    @JsonProperty("IsAnswer")
    private boolean isAnswer;



}
