package com.notrika.gympin.common.place.placeCounseling.Counseling.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
import com.notrika.gympin.common.place.placeBase.enums.PlaceStatusEnum;
import com.notrika.gympin.common.place.placeCounseling.Proficiencies.dto.ProficienciesDto;
import com.notrika.gympin.common.settings.location.dto.LocationDto;
import com.notrika.gympin.common.place.placeGym.sport.dto.SportDto;
import com.notrika.gympin.common.user.user.enums.Gender;
import com.notrika.gympin.common.util._base.dto.BaseDtoWithCreateUpdate;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class CounselingDto extends BaseDtoWithCreateUpdate<CounselingDto> {

    @JsonProperty("Name")
    private String name;

    @JsonProperty("Latitude")
    private double latitude;

    @JsonProperty("Longitude")
    private double longitude;

    @JsonProperty("Tell")
    private String tell;

    @JsonProperty("ContractData")
    private String contractData;

    @JsonProperty("Order")
    private Short order;

    @JsonProperty("CallUs")
    private Boolean callUs;

    @JsonProperty("HasContract")
    private Boolean hasContract;

    @JsonProperty("Address")
    private String address;

    @JsonProperty("ActiveTimes")
    private String ActiveTimes;

    @JsonProperty("AutoDiscount")
    private Boolean autoDiscount;

    @JsonProperty("HasBeneficiary")
    private Boolean hasBeneficiary;

    @JsonProperty("Genders")
    private Set<Gender> genders;

    @JsonProperty("MinPrice")
    private BigDecimal minPrice;

    @JsonProperty("MinPriceBeforeDiscount")
    private BigDecimal minPriceBeforeDiscount;

    @JsonProperty("Status")
    private PlaceStatusEnum status = PlaceStatusEnum.ACTIVE;

    @JsonProperty("Proficiencies")
    private List<ProficienciesDto> proficiencies;

    @JsonProperty("Location")
    private LocationDto location;

    @JsonProperty("Multimedias")
    private List<MultimediaDto> multimedias;

    @JsonProperty("Rate")
    private Double rate;

    @JsonProperty("CommentCount")
    private short commentCount;

}
