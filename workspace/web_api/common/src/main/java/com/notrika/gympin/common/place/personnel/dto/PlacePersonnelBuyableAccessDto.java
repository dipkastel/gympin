package com.notrika.gympin.common.place.personnel.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.ticket.buyable.dto.TicketBuyableDto;
import com.notrika.gympin.common.util._base.dto.BaseDto;
import com.notrika.gympin.common.place.hall.dto.HallDto;
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
public class PlacePersonnelBuyableAccessDto extends BaseDto<PlacePersonnelBuyableAccessDto> {

    @JsonProperty("PlacePersonelId")
    private Long placePersonelId;

    @JsonProperty("Buyable")
    private TicketBuyableDto buyableDto;

    @JsonProperty("Access")
    private Boolean access;
}
