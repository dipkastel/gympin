package com.notrika.gympin.common.android.master.dto;

import com.notrika.gympin.common.BaseDto;
import com.notrika.gympin.common.util.StringUtil;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class SplashDto extends BaseDto<SplashDto> {
    private String initialText = StringUtil.EMPTY_STRING;
}
