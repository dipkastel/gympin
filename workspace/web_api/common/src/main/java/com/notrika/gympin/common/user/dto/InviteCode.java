package com.notrika.gympin.common.user.dto;

import com.notrika.gympin.common._base.dto.BaseDto;
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
public class InviteCode extends BaseDto<InviteCode> {
    private String code;
    private String link;
    private Boolean isActive;
}
