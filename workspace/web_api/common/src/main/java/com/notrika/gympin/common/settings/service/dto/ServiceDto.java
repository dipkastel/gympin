package com.notrika.gympin.common.settings.service.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.settings.location.enums.LocationType;
import com.notrika.gympin.common.user.user.dto.UserDto;
import com.notrika.gympin.common.util._base.dto.BaseDto;
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
public class ServiceDto extends BaseDto<ServiceDto> {

    @JsonProperty("Service")
    private String service;

    @JsonProperty("ExecutorUser")
    private UserDto executorUser;

    @JsonProperty("ExecutionDate")
    private Date executionDate;

    @JsonProperty("Param")
    private String param;

    @JsonProperty("Dto")
    private String dto;


}
