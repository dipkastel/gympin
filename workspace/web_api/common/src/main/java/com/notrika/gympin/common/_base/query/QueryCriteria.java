package com.notrika.gympin.common._base.query;

import com.notrika.gympin.common._base.query.Enums.QueryOperationsEnum;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class QueryCriteria implements Serializable {
    private String key;
    private QueryOperationsEnum operation;
    private Object value;

}
