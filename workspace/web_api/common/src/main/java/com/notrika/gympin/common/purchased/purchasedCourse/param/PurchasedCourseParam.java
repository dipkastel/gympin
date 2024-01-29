package com.notrika.gympin.common.purchased.purchasedCourse.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.purchased.purchasedCourse.enums.CoursePurchasedStatus;
import com.notrika.gympin.common.purchased.purchasedSubscribe.enums.SubscribePurchasedStatus;
import com.notrika.gympin.common.ticket.ticketCourse.param.TicketCourseParam;
import com.notrika.gympin.common.ticket.ticketSubscribe.param.TicketSubscribeParam;
import com.notrika.gympin.common.user.user.param.UserParam;
import com.notrika.gympin.common.util._base.param.BaseParam;
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
public class PurchasedCourseParam extends BaseParam<PurchasedCourseParam> {

    @JsonProperty("Status")
    private CoursePurchasedStatus status;

    @JsonProperty("TicketCourse")
    private TicketCourseParam ticketCourse;

    @JsonProperty("User")
    private UserParam user;

    @JsonProperty("TicketCourseName")
    private String ticketCourseName;

    @JsonProperty("Price")
    private BigDecimal price;

    @JsonProperty("Description")
    private String description;

    @JsonProperty("EntryTotalCount")
    private Short entryTotalCount;


}
