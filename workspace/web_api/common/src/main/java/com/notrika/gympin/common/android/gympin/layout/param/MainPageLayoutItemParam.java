package com.notrika.gympin.common.android.gympin.layout.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.BaseParam;
import com.notrika.gympin.common.android.gympin.layout.enums.MainPageLayoutItemType;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@ToString
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class MainPageLayoutItemParam extends BaseParam<MainPageLayoutItemParam> {

    @JsonProperty("Type")
    private MainPageLayoutItemType type;

    @JsonProperty("Priority")
    private Integer priority;

    @JsonProperty("Name")
    private String name;

    @JsonProperty("Items")
    private List<MainPageLayoutChildItemParam> items;

}
