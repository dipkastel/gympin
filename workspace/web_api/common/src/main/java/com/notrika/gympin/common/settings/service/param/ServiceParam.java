package com.notrika.gympin.common.settings.service.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.settings.location.enums.LocationType;
import com.notrika.gympin.common.util._base.param.BaseParam;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.util.Date;
import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class ServiceParam extends BaseParam<ServiceParam> {

    @JsonProperty("Date")
    public Date date;
}
