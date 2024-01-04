package com.notrika.gympin.common.purchased.purchasedSubscribe.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.purchased.purchasedSubscribe.enums.PurchasedStatus;
import com.notrika.gympin.common.util._base.param.BaseParam;
import com.notrika.gympin.common.ticket.ticketSubscribe.param.TicketSubscribeParam;
import com.notrika.gympin.common.user.user.param.UserParam;
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
public class PurchasedSubscribeParam extends BaseParam<PurchasedSubscribeParam> {

    @JsonProperty("Status")
    private PurchasedStatus status;

    @JsonProperty("TicketSubscribe")
    private TicketSubscribeParam ticketSubscribe;

    @JsonProperty("User")
    private UserParam user;

    @JsonProperty("TicketSubscribeName")
    private String ticketSubscribeName;

    @JsonProperty("Price")
    private BigDecimal price;

    @JsonProperty("Description")
    private String description;

    @JsonProperty("EntryTotalCount")
    private Short entryTotalCount;

    @JsonProperty("TicketSubscribeExpireDate")
    private Date ticketSubscribeExpireDate;

    @JsonProperty("ExpireDate")
    private Date expireDate;

}
