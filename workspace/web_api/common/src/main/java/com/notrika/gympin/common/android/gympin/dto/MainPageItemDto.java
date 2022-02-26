package com.notrika.gympin.common.android.gympin.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.BaseDto;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class MainPageItemDto extends BaseDto<MainPageItemDto> {

    @JsonProperty("type")
    MainPageItemTypeDto type;

    @JsonProperty("priority")
    Integer priority;

    @JsonProperty("items")
    List<MainPageChildItemDto> items;

}
