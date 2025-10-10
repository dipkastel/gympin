package com.notrika.gympin.common.finance.invoice.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.corporate.corporate.dto.CorporateDto;
import com.notrika.gympin.common.corporate.corporatePersonnel.dto.CorporatePersonnelDto;
import com.notrika.gympin.common.place.personnel.dto.PlacePersonnelDto;
import com.notrika.gympin.common.place.placeBase.dto.PlaceDto;
import com.notrika.gympin.common.ticket.buyable.dto.TicketBuyableDto;
import com.notrika.gympin.common.ticket.buyable.enums.BuyableType;
import com.notrika.gympin.common.ticket.ticketFood.dto.TicketFoodMenuDto;
import com.notrika.gympin.common.util._base.dto.BaseDtoWithCreateUpdate;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.Date;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class InvoicePersonnelSelectedFoodDto extends BaseDtoWithCreateUpdate<InvoicePersonnelSelectedFoodDto> {

    @JsonProperty("Personnel")
    private CorporatePersonnelDto personnel;

    @JsonProperty("FoodMenu")
    private TicketFoodMenuDto foodMenu;

    @JsonProperty("Corporate")
    private CorporateDto corporate;

    @JsonProperty("Ordered")
    private Boolean ordered;

    @JsonProperty("Count")
    private Short count;

    @JsonProperty("Price")
    private BigDecimal price;

    @JsonProperty("FullName")
    private String fullName;

    @JsonProperty("Description")
    private String description;

    @JsonProperty("Date")
    private Date date;
}
