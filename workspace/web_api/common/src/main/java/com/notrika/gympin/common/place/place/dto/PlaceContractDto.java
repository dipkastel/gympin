package com.notrika.gympin.common.place.place.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
import com.notrika.gympin.common.place.place.enums.PlaceStatusEnum;
import com.notrika.gympin.common.settings.location.dto.LocationDto;
import com.notrika.gympin.common.sport.sport.dto.SportDto;
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
public class PlaceContractDto extends BaseDtoWithCreateUpdate<PlaceContractDto> {

    @JsonProperty("OwnerName")
    public String ownerName;
    @JsonProperty("OwnerPhoneNumber")
    public String ownerPhoneNumber;
    @JsonProperty("OwnersNationalCode")
    public String ownersNationalCode;
    @JsonProperty("OccupationLicence")
    public String occupationLicence;
    @JsonProperty("RegistrationNumber")
    public String registrationNumber;

}
