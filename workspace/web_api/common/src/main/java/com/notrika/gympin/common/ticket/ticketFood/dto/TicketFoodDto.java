package com.notrika.gympin.common.ticket.ticketFood.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
import com.notrika.gympin.common.place.placeBase.dto.PlaceDto;
import com.notrika.gympin.common.place.placeCatering.dto.PlaceCateringDto;
import com.notrika.gympin.common.place.placeGym.dto.PlaceGymDto;
import com.notrika.gympin.common.ticket.ticketSubscribe.enums.SubscribeStatus;
import com.notrika.gympin.common.user.user.dto.UserDto;
import com.notrika.gympin.common.user.user.enums.Gender;
import com.notrika.gympin.common.util._base.dto.BaseDto;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class TicketFoodDto extends BaseDto<TicketFoodDto> {

    @JsonProperty("Name")
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

    @JsonProperty("IsCount")
    private Boolean isCount;

    @JsonProperty("Description")
    private String description;

    @JsonProperty(value = "Place")
    private PlaceDto place;

    @JsonProperty("MinOrderCount")
    private Short minOrderCount;

    @JsonProperty("MaxOrderCount")
    private Short maxOrderCount;


    @JsonProperty("Category")
    private String category;

    @JsonProperty("Multimedias")
    private List<MultimediaDto> multimedias;

}
