package com.notrika.gympin.common.ticket.ticketCourse.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.place.place.dto.PlaceDto;
import com.notrika.gympin.common.place.placeSport.dto.PlaceSportDto;
import com.notrika.gympin.common.ticket.common.dto.ActiveTimesDto;
import com.notrika.gympin.common.ticket.ticketCourse.enums.CourseStatus;
import com.notrika.gympin.common.user.user.dto.UserDto;
import com.notrika.gympin.common.user.user.enums.Gender;
import com.notrika.gympin.common.util._base.dto.BaseDto;
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
public class TicketCourseDto extends BaseDto<TicketCourseDto> {

    @JsonProperty("Status")
    private CourseStatus status;

    @JsonProperty("Name")
    private String name;

    @JsonProperty("Price")
    private BigDecimal price;

    @JsonProperty("ValuePrice")
    private BigDecimal valuePrice;

    @JsonProperty("PlacePrice")
    private BigDecimal placePrice;

    @JsonProperty("Discount")
    private Short discount;

    @JsonProperty("Enable")
    private Boolean enable;

    @JsonProperty("Gender")
    private Gender gender;

    @JsonProperty("Description")
    private String description;

    @JsonProperty(value = "Place")
    private PlaceDto place;

    @JsonProperty("TargetOfCourse")
    private String targetOfCourse;

    @JsonProperty("AutoRenew")
    private Boolean autoRenew;

    @JsonProperty("ClassCapacity")
    private Short classCapacity;

    @JsonProperty("AgeLimit")
    private String ageLimit;

    @JsonProperty("Timing")
    private String timing;

    @JsonProperty("Coaches")
    private List<UserDto> coaches;

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
    private Short dayAfterStartSell;




    @JsonProperty( "ActiveTimes")
    private List<ActiveTimesDto> activeTimes;

    @JsonProperty( "PlaceSports")
    private List<PlaceSportDto> sports;


}
