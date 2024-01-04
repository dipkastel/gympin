package com.notrika.gympin.common.purchased.purchased.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.place.personnel.param.PlacePersonnelParam;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.user.user.enums.Gender;
import com.notrika.gympin.common.util._base.param.BaseParam;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class PurchasedParam extends BaseParam<PurchasedParam> {


}
