package com.notrika.gympin.common.accounting.account.dto;

import com.notrika.gympin.common.BaseDto;
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
public class GatewayRequestDto extends BaseDto<GatewayRequestDto> {

    private String encryptedRequestToken;

}
