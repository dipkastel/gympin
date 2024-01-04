package com.notrika.gympin.common.util._base.query;

import com.notrika.gympin.common.util._base.query.Enums.QueryTypesEnum;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class Query implements Serializable {
    private QueryTypesEnum queryType = QueryTypesEnum.SEARCH;
    private List<QueryCriteria> criteriaList = new ArrayList<>();
}
