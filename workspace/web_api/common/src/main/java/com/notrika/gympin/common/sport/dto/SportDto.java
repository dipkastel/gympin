package com.notrika.gympin.common.sport.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.BaseDto;
import com.notrika.gympin.common.sport.enums.LaunchStatus;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class SportDto extends BaseDto<SportDto> {

    @JsonProperty("Name")
    private String name;

    @JsonProperty("LaunchStatus")
    private LaunchStatus launchStatus;

    @JsonProperty("LogoIds")
    private List<Long> logoIds;

}
