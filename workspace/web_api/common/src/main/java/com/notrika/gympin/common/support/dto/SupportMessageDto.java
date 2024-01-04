package com.notrika.gympin.common.support.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.dto.BaseDtoWithCreateUpdate;
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
public class SupportMessageDto extends BaseDtoWithCreateUpdate<SupportMessageDto> {

    @JsonProperty("Status")
    private SupportMessageStatus status;

    @JsonProperty("Message")
    private String message;

    @JsonProperty("IsAnswer")
    private boolean isAnswer;

}
