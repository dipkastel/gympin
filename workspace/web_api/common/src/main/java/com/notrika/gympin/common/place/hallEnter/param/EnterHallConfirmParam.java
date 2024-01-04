package com.notrika.gympin.common.place.hallEnter.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.param.BaseParam;
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
public class EnterHallConfirmParam extends BaseParam<EnterHallConfirmParam> {

    @JsonProperty(value = "reference-id")
    private String referenceId;

    @JsonProperty(value = "notes")
    private String notes;

}
