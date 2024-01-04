package com.notrika.gympin.common.purchased.purchasedSubscribe.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.dto.BaseDtoWithCreateUpdate;
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
public class PurchasedSubscribeEntryMessageDto extends BaseDtoWithCreateUpdate<PurchasedSubscribeEntryMessageDto> {

    @JsonProperty("Message")
    private String message;
}
