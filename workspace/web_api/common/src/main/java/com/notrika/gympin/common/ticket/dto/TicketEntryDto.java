package com.notrika.gympin.common.ticket.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.dto.BaseDtoWithCreateUpdate;
import com.notrika.gympin.common.athlete.gate.enums.TicketEntryStatus;
import com.notrika.gympin.common.user.dto.UserDto;
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
public class TicketEntryDto extends BaseDtoWithCreateUpdate<TicketEntryDto> {

    @JsonProperty("AcceptedBy")
    private UserDto acceptedBy;

    @JsonProperty("EnterDate")
    private Date enterDate;

    @JsonProperty("ExitDate")
    private Date exitDate;

    @JsonProperty("TicketEntryStatus")
    private TicketEntryStatus ticketEntryStatus;

    @JsonProperty("Ticket")
    private TicketDto ticketDto;

    @JsonProperty("EntryMessageList")
    private List<TicketEntryMessageDto> entryMessageList;
}
