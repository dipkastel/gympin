package com.notrika.gympin.common;

import lombok.*;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class SearchCriteria implements Serializable {
    private String key;
    private SearchOperations operation;
    private Object value;

}
