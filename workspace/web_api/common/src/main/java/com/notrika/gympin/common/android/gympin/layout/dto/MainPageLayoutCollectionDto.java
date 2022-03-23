package com.notrika.gympin.common.android.gympin.layout.dto;

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
public class MainPageLayoutCollectionDto extends BaseDto<MainPageLayoutCollectionDto> {

    @JsonProperty("CollectionName")
    private String collectionName;

    @JsonProperty("LayoutItemParams")
    private List<MainPageLayoutItemDto> layoutItems;


}
