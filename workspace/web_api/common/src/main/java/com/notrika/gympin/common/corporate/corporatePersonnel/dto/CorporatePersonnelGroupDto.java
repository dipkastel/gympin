package com.notrika.gympin.common.corporate.corporatePersonnel.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.dto.BaseDtoWithCreateUpdate;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
public class CorporatePersonnelGroupDto extends BaseDtoWithCreateUpdate<CorporatePersonnelGroupDto> {

    @JsonProperty("Name")
    private String name;

}
