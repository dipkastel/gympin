package com.notrika.gympin.common.accounting.account.param;

import com.notrika.gympin.common.BaseParam;
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
public class GatewayResponseParam extends BaseParam<GatewayResponseParam> {

    private String encryptedResponseToken;

}
