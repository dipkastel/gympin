package com.notrika.gympin.common.finance.invoice.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.finance.invoice.enums.UserCheckoutTypes;
import com.notrika.gympin.common.purchased.purchasedSubscribe.param.PurchasedSubscribeParam;
import com.notrika.gympin.common.util._base.param.BaseParam;
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
public class InvoiceCheckoutParam extends BaseParam<InvoiceCheckoutParam> {

    @JsonProperty("Invoice")
    private InvoiceParam invoice;

    @JsonProperty("Price")
    private BigDecimal price;

    @JsonProperty("CheckoutType")
    private UserCheckoutTypes checkoutType;

    @JsonProperty("Checkout")
    private List<CheckoutDetailParam> checkout;


}
