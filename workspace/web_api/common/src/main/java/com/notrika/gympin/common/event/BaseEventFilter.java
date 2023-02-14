package com.notrika.gympin.common.event;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.query.BaseQuery;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.Date;

@Data
@SuperBuilder(builderMethodName = "b")
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class BaseEventFilter<T extends BaseEventFilter> extends BaseQuery<T> {

    @JsonProperty("title")
    private String title;

    @JsonProperty("description")
    private String description;

    @JsonProperty("start-date")
    private Date startDate;

    @JsonProperty("end-date")
    private Date endDate;

}
