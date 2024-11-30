package com.notrika.gympin.common.corporate.corporate.param;

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
public class CorporateContractDto extends BaseDtoWithCreateUpdate<CorporateContractDto> {

    @JsonProperty("OwnerName")
    public String ownerName;
    @JsonProperty("OwnerPhoneNumber")
    public String ownerPhoneNumber;
    @JsonProperty("OwnersNationalCode")
    public String ownersNationalCode;
    @JsonProperty("RegistrationNumber")
    public String registrationNumber;

}
