package com.notrika.gympin.common.settings.note.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.finance.invoice.param.InvoiceParam;
import com.notrika.gympin.common.util._base.param.BaseParam;
import com.notrika.gympin.common.corporate.corporate.param.CorporateParam;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.purchased.purchasedSubscribe.param.PurchasedSubscribeParam;
import com.notrika.gympin.common.user.user.param.UserParam;
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
public class NoteParam extends BaseParam<NoteParam> {

    @JsonProperty("Place")
    private PlaceParam place;

    @JsonProperty("Corporate")
    private CorporateParam corporate;

    @JsonProperty("Invoice")
    private InvoiceParam invoice;

    @JsonProperty("User")
    private UserParam user;

    @JsonProperty("Subscribe")
    private PurchasedSubscribeParam subscribe;

    @JsonProperty("Text")
    private String text;

    @JsonProperty("Type")
    private NoteType type;

    @JsonProperty("IsToDo")
    private Boolean isToDo;
}
