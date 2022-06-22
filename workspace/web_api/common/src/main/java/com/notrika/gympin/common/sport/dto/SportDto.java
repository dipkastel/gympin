package com.notrika.gympin.common.sport.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.BaseDtoWithCreateUpdate;
import com.notrika.gympin.common.sport.enums.LaunchStatus;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class SportDto extends BaseDtoWithCreateUpdate<SportDto> {

    @JsonProperty("Name")
    private String name;

    @JsonProperty("LaunchStatus")
    private LaunchStatus launchStatus;

    @JsonProperty("LogoIds")
    private List<Long> logoIds;

}
