package com.notrika.gympin.common.ticket.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.param.BaseParam;
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
public class EntryMessageParam extends BaseParam<EntryMessageParam> {

    @JsonProperty("EntryId")
    private Long EntryId;

    @JsonProperty("Message")
    private String message;

}
