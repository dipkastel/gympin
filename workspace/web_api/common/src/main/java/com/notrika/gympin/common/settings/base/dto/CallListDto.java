package com.notrika.gympin.common.settings.base.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.param.BaseParam;
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
public class CallListDto extends BaseParam<CallListDto> {


    @JsonProperty("data")
    private List<CallListDataItemDto> data;
    @JsonProperty("totalCount")
    private Long totalCount;
    @JsonProperty("pageNumber")
    private Long pageNumber;
    @JsonProperty("pageSize")
    private Long pageSize;


}
