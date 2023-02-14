package com.notrika.gympin.common._base.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.data.domain.Pageable;

import java.io.Serializable;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BasePagedParam  implements Serializable {

    @JsonProperty("Page")
    private int page = 0;

    @JsonProperty("Size")
    private int size = 20;

    @JsonProperty("OrderBy")
    private String orderBy = "Id";

    @JsonProperty("Desc")
    private boolean isDesc = false;

}
