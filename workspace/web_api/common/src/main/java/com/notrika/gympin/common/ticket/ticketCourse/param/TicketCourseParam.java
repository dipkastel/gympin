package com.notrika.gympin.common.ticket.ticketCourse.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.ticket.ticketCourse.enums.CourseStatus;
import com.notrika.gympin.common.user.user.dto.UserDto;
import com.notrika.gympin.common.user.user.enums.Gender;
import com.notrika.gympin.common.util._base.param.BaseParam;
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
    private PlaceParam place;

    @JsonProperty("TargetOfCourse")
    private String targetOfCourse;

    @JsonProperty("AutoRenew")
    private Boolean autoRenew;

    @JsonProperty("ClassCapacity")
    private Short classCapasity;

    @JsonProperty("AgeLimit")
    private String ageLimit;

    @JsonProperty("EntryTotalCount")
    private Short entryTotalCount;

    @JsonProperty( "CourseCapacity")
    private Integer courseCapacity;

    @JsonProperty("CourseLevel")
    private String courseLevel;

    @JsonProperty( "StartDate")
    private Date startDate;

    @JsonProperty( "EndDate")
    private Date EndDate;

    @JsonProperty( "StartSellingDate")
    private Date startSellingDate;

    @JsonProperty( "EndSellingDate")
    private Date EndSellingDate;


}