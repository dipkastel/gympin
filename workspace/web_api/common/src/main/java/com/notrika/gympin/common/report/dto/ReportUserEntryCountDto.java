package com.notrika.gympin.common.report.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.user.user.dto.UserDto;
import com.notrika.gympin.common.util._base.dto.BaseDto;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class ReportUserEntryCountDto extends BaseDto<ReportUserEntryCountDto> {


    @JsonProperty("User")
    private UserDto user;

    @JsonProperty("PersonnelId")
    private Long personnelId;

    @JsonProperty("EnterCount")
    private Long enterCount;




}
