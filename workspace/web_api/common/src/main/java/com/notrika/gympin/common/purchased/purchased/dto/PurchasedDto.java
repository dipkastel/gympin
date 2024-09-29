package com.notrika.gympin.common.purchased.purchased.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.finance.serial.dto.SerialDto;
import com.notrika.gympin.common.place.place.dto.PlaceDto;
import com.notrika.gympin.common.purchased.purchased.enums.PurchasedType;
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
public class PurchasedDto extends BaseDto<PurchasedDto> {

    @JsonProperty("Name")
    private String name;

    @JsonProperty("Key")
    private String Key;

    @JsonProperty("Description")
    private String description;

    @JsonProperty("Discount")
    private Short discount;

    @JsonProperty("Gender")
    private Gender gender;

    @JsonProperty("SellPrice")
    private BigDecimal sellPrice;

    @JsonProperty("PlacePrice")
    private BigDecimal placePrice;

    @JsonProperty("Place")
    private PlaceDto place;

    @JsonProperty("Serial")
    private List<SerialDto> serials;

    @JsonProperty("Customer")
    private UserDto customer;

    @JsonProperty("PurchasedType")
    private PurchasedType purchasedType;

    @JsonProperty("PurchasedStatus")
    private String purchasedStatus;


}
