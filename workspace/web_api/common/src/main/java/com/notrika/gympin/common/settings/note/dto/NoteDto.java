package com.notrika.gympin.common.settings.note.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.corporate.corporate.dto.CorporateDto;
import com.notrika.gympin.common.finance.invoice.dto.InvoiceDto;
import com.notrika.gympin.common.place.place.dto.PlaceDto;
import com.notrika.gympin.common.purchased.purchased.dto.PurchasedDto;
import com.notrika.gympin.common.user.user.dto.UserDto;
import com.notrika.gympin.common.util._base.dto.BaseDtoWithCreateUpdate;
import com.notrika.gympin.common.settings.note.enums.NoteType;
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
public class NoteDto extends BaseDtoWithCreateUpdate<NoteDto> {


    @JsonProperty("Text")
    private String text;

    @JsonProperty("Type")
    private NoteType type;

    @JsonProperty("IsToDo")
    private Boolean isToDo;

    @JsonProperty("Corporate")
    private CorporateDto corporate;

    @JsonProperty("User")
    private UserDto user;

    @JsonProperty("Place")
    private PlaceDto placeDto;

    @JsonProperty("Invoice")
    private InvoiceDto invoice;

    @JsonProperty("Purchased")
    private PurchasedDto purchased;
}
