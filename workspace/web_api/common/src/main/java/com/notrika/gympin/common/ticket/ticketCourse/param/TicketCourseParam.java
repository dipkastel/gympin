package com.notrika.gympin.common.ticket.ticketCourse.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymParam;
import com.notrika.gympin.common.ticket.ticketCourse.enums.CourseStatus;
import com.notrika.gympin.common.user.user.enums.Gender;
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
public class TicketCourseParam extends BaseParam<TicketCourseParam> {

    @JsonProperty("Status")
    private CourseStatus status;

    @JsonProperty(value = "Name", required = true)
    private String name;

    @JsonProperty("ValuePrice")
    private BigDecimal valuePrice;

    @JsonProperty("PlacePrice")
    private BigDecimal placePrice;

    @JsonProperty("Enable")
    private Boolean enable;

    @JsonProperty("Gender")
    private Gender gender;

    @JsonProperty("Description")
    private String description;

    @JsonProperty(value = "Place", required = true)
    private PlaceGymParam place;

    @JsonProperty("TargetOfCourse")
    private String targetOfCourse;

    @JsonProperty("AutoRenew")
    private Boolean autoRenew;

    @JsonProperty("ClassCapacity")
    private Short classCapasity;

    @JsonProperty("AgeLimit")
    private String ageLimit;

    @JsonProperty("Timing")
    private String timing;

    @JsonProperty("EntryTotalCount")
    private Short entryTotalCount;

    @JsonProperty( "CourseCapacity")
    private Integer courseCapacity;

    @JsonProperty("CourseLevel")
    private String courseLevel;

    @JsonProperty( "StartDate")
    private Date startDate;

    @JsonProperty("DayBeforeRenew")
    private Short dayBeforeRenew;

    @JsonProperty("ExpireDuration")
    private Short expireDuration;

    @JsonProperty("DayBeforeStartSell")
    private Short dayBeforeStartSell;

    @JsonProperty("DayAfterStartSell")
    private Short DayAfterStartSell;


//
//    @JsonProperty( "EndDate")
//    private Date EndDate;
//
//    @JsonProperty( "StartSellingDate")
//    private Date startSellingDate;
//
//    @JsonProperty( "EndSellingDate")
//    private Date EndSellingDate;


}
