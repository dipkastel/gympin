package com.notrika.gympin.common.note.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.param.BaseParam;
import com.notrika.gympin.common.corporate.corporate.param.CorporateParam;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.ticket.param.TicketParam;
import com.notrika.gympin.common.user.param.UserParam;
import com.notrika.gympin.common.note.enums.NoteType;
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
public class NoteParam extends BaseParam<NoteParam> {

    @JsonProperty("Place")
    private PlaceParam place;

    @JsonProperty("Corporate")
    private CorporateParam corporate;

    @JsonProperty("User")
    private UserParam user;

    @JsonProperty("Ticket")
    private TicketParam ticket;

    @JsonProperty("Text")
    private String text;

    @JsonProperty("Type")
    private NoteType type;

    @JsonProperty("IsToDo")
    private Boolean isToDo;
}
