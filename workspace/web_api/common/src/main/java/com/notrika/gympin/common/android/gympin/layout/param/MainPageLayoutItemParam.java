package com.notrika.gympin.common.android.gympin.layout.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.BaseParam;
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
public class MainPageLayoutItemParam extends BaseParam<MainPageLayoutItemParam> {

    @JsonProperty("type")
    private MainPageLayoutItemType type;

    @JsonProperty("priority")
    private Integer priority;

    @JsonProperty("items")
    private List<MainPageLayoutChildItemParam> items;

}
