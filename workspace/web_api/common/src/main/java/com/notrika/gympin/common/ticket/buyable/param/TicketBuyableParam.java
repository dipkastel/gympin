package com.notrika.gympin.common.ticket.buyable.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.place.personnel.param.PlacePersonnelParam;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymParam;
import com.notrika.gympin.common.user.user.enums.Gender;
import com.notrika.gympin.common.util._base.param.BaseParam;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class TicketBuyableParam extends BaseParam<TicketBuyableParam> {

    @JsonProperty(value = "Name", required = true)
    private String name;

    @JsonProperty("Price")
    private BigDecimal price;

    @JsonProperty("ValuePrice")
    private BigDecimal valuePrice;

    @JsonProperty("PlacePrice")
    private BigDecimal placePrice;

    @JsonProperty("Discount")
    private Short discount;

    @JsonProperty("Enable")
    private Boolean enable;

    @JsonProperty("Gender")
    private Gender gender;

    @JsonProperty("Description")
    private String description;

    @JsonProperty(value = "Place")
    private PlaceGymParam place;

    @JsonProperty(value = "Beneficiary")
    private PlacePersonnelParam beneficiary;

}
