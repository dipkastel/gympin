package com.notrika.gympin.common.place.parts.personnel.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.ticket.buyable.param.TicketBuyableParam;
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
public class PlacePersonnelBuyableAccessParam extends BaseParam<PlacePersonnelBuyableAccessParam> {

    @JsonProperty("PlacePersonelId")
    private Long placePersonelId;

    @JsonProperty("Buyable")
    private TicketBuyableParam buyableParam;

    @JsonProperty("Access")
    private Boolean access;


}
