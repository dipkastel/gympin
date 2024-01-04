package com.notrika.gympin.common.home.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.dto.BaseDto;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Data
@ToString
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class HomePageDestinationDto extends BaseDto<HomePageDestinationDto> {

    @JsonProperty("Name")
    private String name;

    @JsonProperty("Description")
    private String description;


}
