package com.notrika.gympin.common.accounting.account.param;

import com.notrika.gympin.common.BaseParam;
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
public class GatewayRequestParam extends BaseParam<GatewayRequestParam> {

    private BigDecimal amount;

}
