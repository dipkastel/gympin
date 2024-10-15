package com.notrika.gympin.common.support.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.param.BaseParam;
import com.notrika.gympin.common.support.enums.SupportStatus;
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
    private SupportStatus status;

    @JsonProperty("Message")
    private String messages;

    @JsonProperty("IsAnswer")
    private boolean isAnswer;

    @JsonProperty("IsRead")
    private boolean isRead;



}
