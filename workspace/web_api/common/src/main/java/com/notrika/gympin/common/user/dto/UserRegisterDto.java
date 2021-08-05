package com.notrika.gympin.common.user.dto;

import com.notrika.gympin.common.BaseDto;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class UserRegisterDto extends BaseDto<UserRegisterDto> {
    private String username;
    private String phoneNumber;

}
