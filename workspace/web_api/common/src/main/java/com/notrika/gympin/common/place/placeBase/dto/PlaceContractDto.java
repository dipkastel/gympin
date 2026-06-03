package com.notrika.gympin.common.place.placeBase.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.dto.BaseDtoWithCreateUpdate;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class PlaceContractDto extends BaseDtoWithCreateUpdate<PlaceContractDto> {

    @JsonProperty("ownerName")
    public String ownerName;
    @JsonProperty("ownerPhoneNumber")
    public String ownerPhoneNumber;
    @JsonProperty("ownersNationalCode")
    public String ownersNationalCode;
    @JsonProperty("ownerPosition")
    public String ownerPosition;
    @JsonProperty("registrationNumber")
    public String registrationNumber;
    @JsonProperty("nationalId")
    public String nationalId;
    @JsonProperty("occupationLicence")
    public String occupationLicence;

}
