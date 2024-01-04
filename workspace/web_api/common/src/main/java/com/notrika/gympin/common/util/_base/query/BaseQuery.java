package com.notrika.gympin.common.util._base.query;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import com.notrika.gympin.common.util._base.query.Enums.QueryTypesEnum;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class BaseQuery<T> {

    @JsonProperty("queryType")
    private QueryTypesEnum queryType = QueryTypesEnum.SEARCH;

    @JsonProperty("paging")
    private BasePagedParam paging;

    @JsonIgnore
    private T childFilter;

    @JsonProperty("deleted")
    private Boolean is_deleted = false;
}
