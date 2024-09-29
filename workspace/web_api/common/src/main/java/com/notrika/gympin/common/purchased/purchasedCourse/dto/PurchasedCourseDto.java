package com.notrika.gympin.common.purchased.purchasedCourse.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.finance.serial.dto.SerialDto;
import com.notrika.gympin.common.purchased.purchasedCourse.enums.CoursePurchasedStatus;
import com.notrika.gympin.common.purchased.purchasedSubscribe.dto.PurchasedSubscribeEntryDto;
import com.notrika.gympin.common.ticket.ticketCourse.dto.TicketCourseDto;
import com.notrika.gympin.common.user.user.dto.UserDto;
import com.notrika.gympin.common.util._base.dto.BaseDtoWithCreateUpdate;
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
public class PurchasedCourseDto extends BaseDtoWithCreateUpdate<PurchasedCourseDto> {

    @JsonProperty("Status")
    private CoursePurchasedStatus status;

    @JsonProperty("TicketCourse")
    private TicketCourseDto ticketCourse;

    @JsonProperty("User")
    private UserDto user;

    @JsonProperty("Name")
    private String name;

    @JsonProperty("Key")
    private String key;

    @JsonProperty("Serial")
    private List<SerialDto> serials;

    @JsonProperty("Price")
    private BigDecimal price;

    @JsonProperty("PlacePrice")
    private BigDecimal placePrice;

    @JsonProperty("Description")
    private String description;

    @JsonProperty("EntryTotalCount")
    private Short entryTotalCount;

    @JsonProperty("ClassCapacity")
    private Short classCapacity;

    @JsonProperty("TargetOfCourse")
    private String targetOfCourse;

    @JsonProperty("AgeLimit")
    private String ageLimit;

    @JsonProperty("EntryList")
    private List<PurchasedCourseEntryDto> entryList;

    @JsonProperty("Coaches")
    private List<UserDto> coaches;

    @JsonProperty("CourseCapacity")
    private Integer courseCapacity;

    @JsonProperty("CourseLevel")
    private String courseLevel;

    @JsonProperty("StartDate")
    private Date startDate;

    @JsonProperty("DayBeforeRenew")
    private Short dayBeforeRenew;

    @JsonProperty("ExpireDuration")
    private Short expireDuration;

    @JsonProperty("DayBeforeStartSell")
    private Short dayBeforeStartSell;

    @JsonProperty("EndSellAfterDays")
    private Short endSellAfterDays;


//
//    @JsonProperty("EndDate")
//    private Date endDate;
//
//    @JsonProperty("StartSellingDate")
//    private Date startSellingDate;
//
//    @JsonProperty("EndSellingDate")
//    private Date endSellingDate;


}
