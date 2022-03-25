package com.notrika.gympin.common.android.gympin.layout.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.BaseDto;
import com.notrika.gympin.common.android.gympin.layout.enums.MainPageLayoutItemType;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class MainPageLayoutItemDto extends BaseDto<MainPageLayoutItemDto> {

    @JsonProperty("Type")
    private MainPageLayoutItemType type;

    @JsonProperty("Priority")
    private Integer priority;

    @JsonProperty("Items")
    private List<MainPageLayoutChildItemDto> items;

}
