package com.notrika.gympin.common.location.param;

import com.notrika.gympin.common.BaseParam;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class RegionParam extends BaseParam<RegionParam> {
    private Long id;
    private String name;
    private CityParam city;
}
