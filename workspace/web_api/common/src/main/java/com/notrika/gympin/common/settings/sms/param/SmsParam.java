package com.notrika.gympin.common.settings.sms.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.corporate.corporate.param.CorporateParam;
import com.notrika.gympin.common.finance.invoice.param.InvoiceParam;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.purchased.purchased.param.PurchasedParam;
import com.notrika.gympin.common.settings.note.enums.NoteType;
import com.notrika.gympin.common.settings.sms.enums.SmsStatus;
import com.notrika.gympin.common.user.user.param.UserParam;
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
public class SmsParam extends BaseParam<SmsParam> {

    @JsonProperty("SmsStatus")
    private SmsStatus smsStatus;

}
