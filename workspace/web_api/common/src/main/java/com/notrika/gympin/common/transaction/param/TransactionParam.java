package com.notrika.gympin.common.transaction.param;

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
public class TransactionParam extends BaseParam<TransactionParam> {

    @JsonProperty("CorporateId")
    private Long corporateId;


    @JsonProperty("PlaceId")
    private Long placeId;


    @JsonProperty("UserId")
    private Long UserId;


}
