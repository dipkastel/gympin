package com.notrika.gympin.common.plan.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.param.BaseParam;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.user.enums.Gender;
import com.notrika.gympin.common.user.enums.PlanExpireType;
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
public class PlanParam extends BaseParam<PlanParam> {

    @JsonProperty(value = "Name", required = true)
    private String name;

    @JsonProperty("Price")
    private BigDecimal price;

    @JsonProperty("ValuePrice")
    private BigDecimal valuePrice;

    @JsonProperty("Enable")
    private Boolean enable;


    @JsonProperty("Gender")
    private Gender gender;

    @JsonProperty("Description")
    private String description;

    @JsonProperty("EntryTotalCount")
    private Short entryTotalCount;

    @JsonProperty("Start_selling_date")
    private Date startSellingDate;

    @JsonProperty("End_selling_date")
    private Date endSellingDate;

    @JsonProperty( "Expire_type")
    private PlanExpireType planExpireType;

    @JsonProperty( "Expire_date")
    private Date expireDate;

    @JsonProperty( "Expire_duration")
    private Short expireDuration;

    @JsonProperty(value = "Place", required = true)
    private PlaceParam place;

}
