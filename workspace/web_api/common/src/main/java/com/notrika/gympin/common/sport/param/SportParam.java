package com.notrika.gympin.common.sport.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.param.BaseParam;
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
public class SportParam extends BaseParam<SportParam> {

    @JsonProperty("Name")
    private String name;

    @JsonProperty("LaunchStatus")
    private LaunchStatus launchStatus;

    @JsonProperty("PictureIds")
    private List<Long> pictureIds;

}
