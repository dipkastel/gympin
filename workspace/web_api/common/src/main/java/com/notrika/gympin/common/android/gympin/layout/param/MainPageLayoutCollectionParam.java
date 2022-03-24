package com.notrika.gympin.common.android.gympin.layout.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.BaseParam;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class MainPageLayoutCollectionParam extends BaseParam<MainPageLayoutCollectionParam> {

    @JsonProperty("CollectionName")
    private String collectionName;

    @JsonProperty("LayoutItem")
    private List<MainPageLayoutItemParam> layoutItems;
}
