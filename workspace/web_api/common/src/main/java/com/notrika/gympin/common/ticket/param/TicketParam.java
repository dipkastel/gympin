package com.notrika.gympin.common.ticket.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.param.BaseParam;
import com.notrika.gympin.common.plan.param.PlanParam;
import com.notrika.gympin.common.support.param.SupportMessageParam;
import com.notrika.gympin.common.ticket.enums.TicketStatus;
import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.param.UserParam;
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
public class TicketParam extends BaseParam<TicketParam> {

    @JsonProperty("Status")
    private TicketStatus status;

    @JsonProperty("Plan")
    private PlanParam plan;

    @JsonProperty("User")
    private UserParam user;

    @JsonProperty("PlanName")
    private String planName;

    @JsonProperty("Price")
    private BigDecimal price;

    @JsonProperty("Description")
    private String description;

    @JsonProperty("EntryTotalCount")
    private Short entryTotalCount;

    @JsonProperty("PlanExpireDate")
    private Date planExpireDate;

    @JsonProperty("ExpireDate")
    private Date expireDate;

}
