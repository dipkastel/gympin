package com.notrika.gympin.common.ticket.ticketFood.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.multimedia.param.MultimediaRetrieveParam;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymParam;
import com.notrika.gympin.common.util._base.param.BaseParam;
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
public class TicketFoodMultimediaParam extends BaseParam<TicketFoodMultimediaParam> {

    @JsonProperty("TicketFood")
    private TicketFoodParam ticket;

    @JsonProperty("Multimedia")
    private MultimediaRetrieveParam multimedia;
}
