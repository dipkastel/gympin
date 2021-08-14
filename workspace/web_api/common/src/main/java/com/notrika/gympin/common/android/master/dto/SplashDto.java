package com.notrika.gympin.common.android.master.dto;

import com.notrika.gympin.common.BaseDto;
import com.notrika.gympin.common.util.StringUtil;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class SplashDto extends BaseDto<SplashDto> {
    private String initialText= StringUtil.EMPTY_STRING;
}
