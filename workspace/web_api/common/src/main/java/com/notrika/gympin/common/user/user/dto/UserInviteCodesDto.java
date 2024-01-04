package com.notrika.gympin.common.user.user.dto;

import com.notrika.gympin.common.util._base.dto.BaseDto;
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
public class UserInviteCodesDto extends BaseDto<UserInviteCodesDto> {
    private String Title;
    private String descriptoin;
    private InviteCode firstInviteCode;
    private InviteCode secondInviteCode;

}
