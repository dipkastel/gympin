package com.notrika.gympin.common.purchased.purchasedSubscribe.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.dto.BaseDtoWithCreateUpdate;
import com.notrika.gympin.common.purchased.purchasedSubscribe.enums.SubscribeEntryStatus;
import com.notrika.gympin.common.user.user.dto.UserDto;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.util.Date;
import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class PurchasedSubscribeEntryDto extends BaseDtoWithCreateUpdate<PurchasedSubscribeEntryDto> {

    @JsonProperty("AcceptedBy")
    private UserDto acceptedBy;

    @JsonProperty("EnterDate")
    private Date enterDate;

    @JsonProperty("ExitDate")
    private Date exitDate;

    @JsonProperty("SubscribeEntryStatus")
    private SubscribeEntryStatus subscribeEntryStatus;

    @JsonProperty("Subscribe")
    private PurchasedSubscribeDto purchasedSubscribeDto;

    @JsonProperty("EntryMessageList")
    private List<PurchasedSubscribeEntryMessageDto> entryMessageList;
}
