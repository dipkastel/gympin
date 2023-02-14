package com.notrika.gympin.common.ticket.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.dto.BaseDtoWithCreateUpdate;
import com.notrika.gympin.common._base.param.BaseParam;
import com.notrika.gympin.common.plan.dto.PlanDto;
import com.notrika.gympin.common.plan.param.PlanParam;
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
import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class TicketDto extends BaseDtoWithCreateUpdate<TicketDto> {

    @JsonProperty("Status")
    private TicketStatus status;

    @JsonProperty("Plan")
    private PlanDto plan;

    @JsonProperty("User")
    private UserDto user;

    @JsonProperty("PlanName")
    private String planName;

    @JsonProperty("Serial")
    private String serial;

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

    @JsonProperty("EntryList")
    private List<TicketEntryDto> entryList;


}
